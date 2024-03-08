import React, { useEffect, useState, useRef } from "react";
// import { data } from "./../DummyData/data";
import { Col, Form, Input, Row, Tooltip, message } from "antd";
import { Button, Dropdown } from "ms-custom-react-components-library";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import { QuestionCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import FormSuccess from "./FormSuccess";
import { useDispatch, useSelector } from "react-redux";
import {
    setReduxScore,
    incrementTimeElapsed,
    globalStore,
    setRecordedTime,
} from "../store/globalStore";
import { LineWave } from "react-loader-spinner";

export default function Home() {
    const store = useSelector(globalStore);
    const [personalityNumber, setpersonalityNumber] = useState(1);
    const [selectedPersonality, setselectedPersonality] = useState(1);
    const [allData, setAllData] = useState([]);
    const [isSubmitSuccess, setisSubmitSuccess] = useState(false);
    const [isFormCompleted, setisFormCompleted] = useState(false);
    const [hintTextVisible, setHintTextVisible] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [incorrectCounter, setIncorrectCounter] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState([]);
    const isDesktopOrLaptop = useMediaQuery({
        query: "(min-width: 1224px)",
    });
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
    const [form] = Form.useForm();
    const scrollRef = useRef(null);
    const timeoutRef = useRef(null);
    const counterRef = useRef(null);
    const dispatch = useDispatch();

    const startQuestionnaire = () => {
        setStartTime(new Date());
    };

    const calculateElapsedTime = () => {
        const endTime = new Date();
        if (startTime && endTime) {
            const elapsedTime = endTime - startTime; // Time difference in milliseconds
            // You can convert milliseconds to seconds, minutes, etc., as needed

            const sec = elapsedTime / 1000;
            return Math.round(sec * 100) / 100;
        }
        return 0;
    };
    const fetchData = async () => {
        setLoading(true);
        axios
            .get(
                "https://pam-engagement-server-renderprod.onrender.com/questionDetails"
            )
            .then((response) => {
                if (response.status === 200) {
                    const sortedResponse = response.data.sort(
                        (a, b) => a.id - b.id
                    );
                    setAllData(sortedResponse);

                    setLoading(false);

                    startQuestionnaire();

                    counterRef.current = setInterval(() => {
                        dispatch(incrementTimeElapsed());
                    }, 1000);
                }
            });
    };
    useEffect(() => {
        allData.map((item) => {
            if (item.id == personalityNumber) {
                setQuestions(item.questions);
                setselectedPersonality(item);
            }
        });
    }, [personalityNumber, loading]);

    const handleFormSubmit = (scoreCurr, responseTime) => {
        timeoutRef.current = setTimeout(() => {
            setisFormCompleted(true);
            setLoading(true);

            const apiBody = {
                id: "-1",
                teamName: store.teamName,
                scores: scoreCurr,
                responseTime: responseTime,
                submissionTime: new Date().toGMTString(),
            };
            axios
                .post(
                    "https://pam-engagement-server-renderprod.onrender.com/postresponse",
                    apiBody
                )
                .then((response) => {
                    if (response.status === 200) {
                    }
                    setLoading(false);
                });
        }, 3000);
    };
    function onSubmit(values) {
        let scoreTemp = score;
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        let valueAnswers = Object.values(values);
        if (valueAnswers.includes(undefined)) {
            message.error("Please provide all inputs!");
            return;
        }
        // axios
        //   .post(
        //     "SaveResponse?teamName=" + sessionStorage.getItem("teamName"),
        //     dataToSave
        //   )
        //   .then((response) => {
        // console.log(response);
        // if (response.status === 200) {
        let tempData = [...allData];
        let isValueCorrect = false;
        let allAnswerCorrect = true;
        tempData.map((obj) => {
            if (obj.id == personalityNumber) {
                obj.questions.map((ques) => {
                    if (
                        values[ques.id] !== null &&
                        values[ques.id] !== undefined &&
                        ques.answer.toLowerCase() ==
                            values[ques.id].toLowerCase()
                    ) {
                        // obj.blur = false;
                        isValueCorrect = true;
                        return;
                    } else allAnswerCorrect = false;
                });
            }
            if (isValueCorrect) return;
        });

        if (isValueCorrect && allAnswerCorrect) {
            setisSubmitSuccess(true);
            if (scrollRef.current) {
                // scrollRef.current.scrollIntoView({
                //     behavior: "smooth",
                //     block: "end",
                // });
                window.scrollTo({
                    top: 0,
                    behavior: "smooth", // Optional: Adds smooth scrolling behavior
                });
            }

            //Score Calculation
            if (hintTextVisible) {
                if (incorrectCounter == 0) {
                    scoreTemp += 50;
                    setScore((prev) => prev + 50);
                    dispatch(setReduxScore(score + 50));
                }
            } else {
                if (incorrectCounter == 0) {
                    scoreTemp += 100;
                    setScore((prev) => prev + 100);
                    dispatch(setReduxScore(score + 100));
                } else if (incorrectCounter == 1) {
                    scoreTemp += 50;
                    setScore((prev) => prev + 50);
                    dispatch(setReduxScore(score + 50));
                }
            }

            //For increment if answer is correct
            setIncorrectCounter(0);
            setpersonalityNumber((prev) => prev + 1);
            setisSubmitSuccess(false);
            setHintTextVisible(false);

            tempData.map((obj) => {
                if (obj.id == personalityNumber) {
                    obj.questions.map((ques) => {
                        if (
                            values[ques.id] !== null &&
                            values[ques.id] !== undefined &&
                            ques.answer.toLowerCase() ==
                                values[ques.id].toLowerCase()
                        ) {
                            obj.blur = false;
                        }
                    });
                }
                if (isValueCorrect) return;
            });
            // setisSubmitSuccess(true);
            message.success("Correct Answer!");
            setIncorrectCounter(0);
            if (personalityNumber == allData.length) {
                if (counterRef.current) {
                    clearInterval(counterRef.current);
                }
                const responseTime = calculateElapsedTime();
                dispatch(setRecordedTime(responseTime));

                // const timeSpan = calculateElapsedTime();
                setisSubmitSuccess(true);

                handleFormSubmit(scoreTemp, responseTime);
            } else {
                form.resetFields();
            }
        } else {
            message.error(
                personalityNumber == allData.length || incorrectCounter === 1
                    ? "Incorrect response!"
                    : "Incorrect response! Please try again."
            );

            if (personalityNumber == allData.length && incorrectCounter === 1) {
                if (counterRef.current) {
                    clearInterval(counterRef.current);
                }
                const responseTime = calculateElapsedTime();
                dispatch(setRecordedTime(responseTime));
                // const timeSpan = calculateElapsedTime();
                setisSubmitSuccess(true);

                handleFormSubmit(score, responseTime);
            } else setIncorrectCounter((prev) => prev + 1);
        }
        setAllData([...tempData]);

        // } else message.error("Unable to save data! Please try again.");
        // });
    }

    useEffect(() => {
        fetchData();
        return () => clearInterval(counterRef.current);
    }, []);

    const ht = window.innerHeight;
    return (
        <>
            {loading ? (
                <div
                    style={{
                        height: `calc(${ht}px - 64px)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <LineWave
                        visible={true}
                        height="200"
                        width="200"
                        color="#27a6a4"
                        ariaLabel="line-wave-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        firstLineColor=""
                        middleLineColor=""
                        lastLineColor=""
                    />
                </div>
            ) : (
                <div
                    className="content"
                    style={{ height: `calc(${ht}px - 64px)` }}
                >
                    {isFormCompleted ? (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                height: "60vh",
                                alignItems: "center",
                            }}
                        >
                            <FormSuccess />
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <CheckCircleOutlined
                                    style={{
                                        fontSize: "10rem",
                                        color: "#27a6a4",
                                        // textAlign: "right",
                                    }}
                                />
                                <p
                                    style={{
                                        marginTop: "2rem",
                                        textAlign: "center",
                                        fontWeight: "500",
                                    }}
                                >
                                    Congratulations on completeing the quiz!
                                </p>
                                <p
                                    style={{
                                        marginTop: "0.5rem",
                                        textAlign: "center",
                                        // fontWeight: "500",
                                        fontSize: "0.85rem",
                                    }}
                                >
                                    You scored {store.score} points. Time
                                    Elapsed {store.recordedTime} seconds.
                                </p>
                                <p
                                    style={{
                                        marginTop: "0.5rem",
                                        textAlign: "center",
                                        // fontWeight: "500",
                                        fontSize: "0.85rem",
                                    }}
                                >
                                    You can close this tab now.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div
                                style={{
                                    maxWidth: "40rem",
                                    margin: "auto",
                                    padding: "1rem",
                                }}
                            >
                                {/* <Row
                            gutter={[8, 8]}
                            style={{ justifyContent: "center", width: "100%" }}
                        >
                            {allData.map((item) => {
                                return (
                                    <Col
                                        className="gutter-row"
                                        span={isTabletOrMobile ? 12 : 8}
                                    >
                                        <img
                                            key={item.id}
                                            style={{
                                                marginInline: "0.5rem",
                                                filter: item.blur
                                                    ? "blur(7px) grayscale(100%)"
                                                    : "",
                                                // filter: "grayscale(100%)",
                                            }}
                                            width={120}
                                            height={120}
                                            src={item.path}
                                        />
                                    </Col>
                                );
                            })}
                        </Row> */}
                                <div
                                    ref={scrollRef}
                                    style={{
                                        // background: "red",
                                        // padding: "8px",

                                        display: "grid",
                                        gridTemplateColumns: isTabletOrMobile
                                            ? "repeat(2, minmax(0, 1fr))"
                                            : "repeat(3, minmax(0, 1fr))",
                                        gridGap: "1rem",
                                    }}
                                >
                                    {allData.map((item) => {
                                        return (
                                            <div
                                                style={{
                                                    // background: "red",

                                                    maxHeight: "8rem",
                                                    maxWidth: "8rem",
                                                    display: "flex",
                                                    margin: "auto",
                                                }}
                                            >
                                                <img
                                                    key={item.id}
                                                    style={{
                                                        marginInline: "0.5rem",
                                                        filter: item.blur
                                                            ? "blur(10px) grayscale(100%)"
                                                            : "",
                                                        // filter: "grayscale(100%)",
                                                        width: "100%",
                                                        height: "auto",
                                                        margin: "auto",
                                                        // width: "20rem",
                                                    }}
                                                    // width={}
                                                    // width={120}
                                                    // height={120}
                                                    src={item.path}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                                <div style={{ marginTop: "5rem" }}>
                                    <Form form={form} onFinish={onSubmit}>
                                        {questions.map((ques) => {
                                            return (
                                                <div>
                                                    <p
                                                        style={{
                                                            marginBottom:
                                                                "1rem",
                                                        }}
                                                    >
                                                        {`${ques.id}. ${ques.text}`}
                                                    </p>
                                                    <Form.Item name={ques.id}>
                                                        {console.log(
                                                            "ABC",
                                                            ques.dropdownOptions
                                                        )}
                                                        <Dropdown
                                                            options={ques.dropdownOptions.map(
                                                                (el) => ({
                                                                    label: el,
                                                                    value: el,
                                                                })
                                                            )}
                                                            placeholder="Select Answer"
                                                            noMaxWidth
                                                        />
                                                        {/* <Select
                                                    placeholder="Select Answer"
                                                    options={options}
                                                    // style={{ borderColor: "#27a6a4", color: "#27a6a4" }}
                                                /> */}
                                                    </Form.Item>
                                                </div>
                                            );
                                        })}
                                        <div>
                                            {hintTextVisible ? (
                                                <ul>
                                                    {selectedPersonality.hintText.map(
                                                        (hint) => {
                                                            return (
                                                                <li>{hint}</li>
                                                            );
                                                        }
                                                    )}
                                                </ul>
                                            ) : (
                                                <p
                                                    onClick={() => {
                                                        setHintTextVisible(
                                                            true
                                                        );
                                                    }}
                                                    style={{
                                                        cursor: "pointer",
                                                        fontStyle: "italic",
                                                        width: "max-content",
                                                        fontSize: "0.8rem",
                                                        display:
                                                            selectedPersonality
                                                                .hintText
                                                                ?.length == 0
                                                                ? "none"
                                                                : "block",
                                                    }}
                                                >
                                                    {/* <Tooltip
                        title="Click here to view the hint(s)!"
                        overlayInnerStyle={{ fontSize: "0.7rem" }}
                      >  */}
                                                    Reveal Hint(s)
                                                    <QuestionCircleOutlined
                                                        style={{
                                                            marginLeft:
                                                                "0.4rem",
                                                            color: "#27a6a4",
                                                            marginTop: "0.2rem",
                                                        }}
                                                    />
                                                    {/* </Tooltip> */}
                                                </p>
                                            )}
                                        </div>
                                        <div
                                            style={{
                                                marginTop: "2rem",
                                                display: "flex",
                                                justifyContent: "end",
                                                gap: "1rem",
                                            }}
                                        >
                                            <Button
                                                primary
                                                disabled={
                                                    isSubmitSuccess ||
                                                    incorrectCounter >= 2
                                                }
                                                htmlType="submit"
                                            >
                                                Submit
                                            </Button>
                                            {incorrectCounter === 2 && (
                                                <Button
                                                    transparent
                                                    onClick={() => {
                                                        // if (!isSubmitSuccess) {
                                                        //   message.error("Please provide an input first!");
                                                        //   return;
                                                        // }
                                                        setIncorrectCounter(0);
                                                        setpersonalityNumber(
                                                            (prev) => prev + 1
                                                        );
                                                        setisSubmitSuccess(
                                                            false
                                                        );
                                                        setHintTextVisible(
                                                            false
                                                        );
                                                        form.resetFields();
                                                    }}
                                                    disabled={
                                                        personalityNumber ==
                                                        allData.length
                                                    }
                                                >
                                                    Next
                                                </Button>
                                            )}
                                        </div>
                                    </Form>
                                    {/* <p>{allData.filter((x) => x.id == personalityNumber)[0]?.question}</p>
            <Input
              placeholder="Enter your answer here"
              defaultValue={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
            /> */}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
