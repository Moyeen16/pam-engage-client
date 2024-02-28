import React, { useEffect, useState, useRef } from "react";
import { data } from "./../DummyData/data";
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

const options = [
    {
        label: "Virat Kohli",
        value: "Virat Kohli",
    },
    {
        label: "Ratan Tata",
        value: "Ratan Tata",
    },
    {
        label: "Narayana Murthy",
        value: "Narayana Murthy",
    },
    {
        label: "Sourav Ganguly",
        value: "Sourav Ganguly",
    },
    {
        label: "Indra Nooyi",
        value: "Indra Nooyi",
    },
    {
        label: "Satya Nadella",
        value: "Satya Nadella",
    },
];

export default function Home() {
    const store = useSelector(globalStore);
    const [personalityNumber, setpersonalityNumber] = useState(1);
    const [selectedPersonality, setselectedPersonality] = useState(1);
    const [allData, setAllData] = useState(data);
    const [isSubmitSuccess, setisSubmitSuccess] = useState(false);
    const [isFormCompleted, setisFormCompleted] = useState(false);
    const [hintTextVisible, setHintTextVisible] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [incorrectCounter, setIncorrectCounter] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [score, setScore] = useState(0);
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
            console.log(`Elapsed time: ${elapsedTime} milliseconds`);
            const sec = elapsedTime / 1000;
            return Math.round(sec * 100) / 100;
        }
        return 0;
    };
    useEffect(() => {
        // axios.get("GetAllData").then((response) => {
        //   console.log(response);
        //   if (response.status === 200) {
        //     setAllData(response);
        //     response.data.map((item) => {
        //       if (item.id == personalityNumber) {
        //          setQuestions(item.questions);
        //          setselectedPersonality(item);
        //       }
        //     });
        //   }
        // });

        allData.map((item) => {
            if (item.id == personalityNumber) {
                setQuestions(item.questions);
                setselectedPersonality(item);
            }
        });
    }, [personalityNumber]);

    function onSubmit(values) {
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
                                    setScore((prev) => prev + 50);
                                    dispatch(setReduxScore(score + 50));
                                }
                            } else {
                                if (incorrectCounter == 0) {
                                    setScore((prev) => prev + 100);
                                    dispatch(setReduxScore(score + 100));
                                } else if (incorrectCounter == 1) {
                                    setScore((prev) => prev + 50);
                                    dispatch(setReduxScore(score + 50));
                                }
                            }

                            //For increment if answer is correct
                            setIncorrectCounter(0);
                            setpersonalityNumber((prev) => prev + 1);
                            setisSubmitSuccess(false);
                            setHintTextVisible(false);
                            form.resetFields();
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
                dispatch(setRecordedTime(calculateElapsedTime()));
                // const timeSpan = calculateElapsedTime();
                setisSubmitSuccess(true);
                timeoutRef.current = setTimeout(() => {
                    setisFormCompleted(true);
                }, 3000);
            }
        } else {
            message.error("Incorrect response! Please try again.");
            setIncorrectCounter((prev) => prev + 1);
        }
        setAllData([...tempData]);
        console.log("FORM", form.getFieldValue());
        // } else message.error("Unable to save data! Please try again.");
        // });
    }

    useEffect(() => {
        startQuestionnaire();

        counterRef.current = setInterval(() => {
            dispatch(incrementTimeElapsed());
        }, 1000);
        return () => clearInterval(counterRef.current);
    }, []);

    const ht = window.innerHeight;
    return (
        <div className="content" style={{ height: `calc(${ht}px - 64px)` }}>
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
                            You scored {store.score} points. Time Elapsed{" "}
                            {store.recordedTime} seconds.
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
                                                    ? "blur(7px) grayscale(100%)"
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
                                            <p style={{ marginBottom: "1rem" }}>
                                                {ques.text}
                                            </p>
                                            <Form.Item name={ques.id}>
                                                <Dropdown
                                                    options={options}
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
                                                    return <li>{hint}</li>;
                                                }
                                            )}
                                        </ul>
                                    ) : (
                                        <p
                                            onClick={() => {
                                                setHintTextVisible(true);
                                            }}
                                            style={{
                                                cursor: "pointer",
                                                fontStyle: "italic",
                                                width: "max-content",
                                                fontSize: "0.8rem",
                                                display:
                                                    selectedPersonality.hintText
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
                                                    marginLeft: "0.4rem",
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
                                                setisSubmitSuccess(false);
                                                setHintTextVisible(false);
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
    );
}
