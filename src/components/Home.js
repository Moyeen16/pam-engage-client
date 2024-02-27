import React, { useEffect, useState, useRef } from "react";
import { data } from "./../DummyData/data";
import { Button, Col, Form, Input, Row, Select, Tooltip, message } from "antd";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import { QuestionCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import FormSuccess from "./FormSuccess";

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
    const [personalityNumber, setpersonalityNumber] = useState(1);
    const [selectedPersonality, setselectedPersonality] = useState(1);
    const [allData, setAllData] = useState(data);
    const [isSubmitSuccess, setisSubmitSuccess] = useState(false);
    const [isFormCompleted, setisFormCompleted] = useState(false);
    const [hintTextVisible, setHintTextVisible] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [incorrectCounter, setIncorrectCounter] = useState(0);
    const isDesktopOrLaptop = useMediaQuery({
        query: "(min-width: 1224px)",
    });
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
    const [form] = Form.useForm();
    const scrollRef = useRef(null);
    const timeoutRef = useRef(null);

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
                                scrollRef.current.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start",
                                });
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
            if (personalityNumber == allData.length) {
                setisSubmitSuccess(true);
                timeoutRef.current = setTimeout(() => {
                    setisFormCompleted(true);
                    setIncorrectCounter(0);
                }, 3000);
            } else {
                message.success("Correct Answer!");
                setIncorrectCounter(0);
            }
        } else {
            message.error("Incorrect response! Please try again.");
            setIncorrectCounter((prev) => prev + 1);
        }
        setAllData([...tempData]);
        // } else message.error("Unable to save data! Please try again.");
        // });
    }

    return (
        <div
            style={{
                paddingInline: "3rem",
                maxHeight: "85vh",
                overflowY: "auto",
            }}
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
                    <div>
                        <CheckCircleOutlined
                            style={{
                                marginInline: "10rem",
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
                            You can close this tab now.
                        </p>
                    </div>
                </div>
            ) : (
                <div>
                    <div style={{ maxWidth: "60rem", margin: "auto" }}>
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

                                            maxHeight: "15rem",
                                            maxWidth: "15rem",
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
                                            <p>{ques.text}</p>
                                            <Form.Item name={ques.id}>
                                                <Select
                                                    placeholder="Select Answer"
                                                    options={options}
                                                    // style={{ borderColor: "#27a6a4", color: "#27a6a4" }}
                                                />
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
                                    }}
                                >
                                    <Button
                                        type="primary"
                                        disabled={
                                            isSubmitSuccess ||
                                            incorrectCounter >= 2
                                        }
                                        style={
                                            isSubmitSuccess ||
                                            incorrectCounter >= 2
                                                ? {
                                                      marginRight: "1rem",
                                                      backgroundColor:
                                                          "#efefef",
                                                      color: "#27a6a4",
                                                  }
                                                : {
                                                      marginRight: "1rem",
                                                      backgroundColor:
                                                          "#27a6a4",
                                                  }
                                        }
                                        htmlType="submit"
                                    >
                                        Submit
                                    </Button>
                                    {incorrectCounter === 2 && (
                                        <Button
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
                                            style={{
                                                borderColor: "#27a6a4",
                                                color: "#27a6a4",
                                            }}
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
