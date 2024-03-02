import { Box, Button, Grid } from "@mui/material";
import { useState, useEffect } from "react";
// import Draggable from "react-draggable";
import peneditIcon from "@/assets/images/pen-edit.svg";
import arrowsexpandIcon from "@/assets/images/arrows-expand.svg";
import deleteBinIcon from "@/assets/images/delete-bin.svg";
import videoplayercontrolsIcon from "@/assets/images/video-player-controls.svg";
// import { Draggable } from "react-drag-reorder";
import PropTypes from "prop-types";

function DragCard({
  courseContent,
  quizContent,
  editCourseContent,
  removeCourseContent,
  setCloseQuizClicked,
  courseContentOrder,
  setCourseContentOrder,
}) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const lessonContent = courseContent.filter((value) => {
      if (value?.scqId || value?.mcqId || value?.booleanId || value?.typeQId) {
        return;
      } else {
        return value;
      }
    });
    const lessonPluzQuizList = [...lessonContent, ...quizContent];
    const sortedLessonPluzQuizList = lessonPluzQuizList.sort(
      (a, b) =>
        courseContentOrder.indexOf(a?.lessonId ?? a?.quizId) -
        courseContentOrder.indexOf(b?.lessonId ?? b?.quizId)
    );
    setItems(sortedLessonPluzQuizList);
  }, [courseContent, courseContentOrder, quizContent]);

  // const rearrangeCardsList = (oldPos, newPos) => {
  //   const draggedItem = items[oldPos];
  //   items.splice(oldPos, 1);
  //   items.splice(newPos, 0, draggedItem);
  //   setItems(items);
  // };
  //console.log({ items });

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
  };

  // Function to handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  /* Swap elements in the copy */
  function swapElements(array, index1, index2) {
    if (
      index1 < 0 ||
      index1 >= array.length ||
      index2 < 0 ||
      index2 >= array.length
    ) {
      throw new Error("Index out of bounds");
    }

    // Create a copy of the original array
    let newArray = array.slice();

    [newArray[index1], newArray[index2]] = [newArray[index2], newArray[index1]];

    return newArray;
  }

  /*
  // Rearrange elements in the copy
  function rearrangeElements(array, draggedIndex, targetIndex) {
    if (
      draggedIndex < 0 ||
      draggedIndex >= array.length ||
      targetIndex < 0 ||
      targetIndex >= array.length
    ) {
      throw new Error("Index out of bounds");
    }
    const draggedItem = items[draggedIndex];
    items.splice(draggedIndex, 1);
    items.splice(targetIndex, 0, draggedItem);

    return items;
  }
*/

  // Function to handle drop
  const handleDrop = (e, targetIndex) => {
    const draggedIndex = e.dataTransfer.getData("index");
    let newArray = swapElements(items, draggedIndex, targetIndex);
    //let newArray = rearrangeElements(items, draggedIndex, targetIndex);
    setItems(newArray);

    const newSortedIdList = [];
    newArray.map((item) => {
      if (item?.lessonId || item?.quizId) {
        newSortedIdList.push(item?.lessonId || item?.quizId);
      }
    });
    setCourseContentOrder(newSortedIdList);
  };

  return (
    <>
      {/* <Draggable onPosChange={rearrangeCardsList}> */}
      {items.map((value, key) => (
        <div
          key={key}
          draggable
          onDragStart={(e) => handleDragStart(e, key)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, key)}
        >
          <Grid item xs={12}>
            <Box className="courseContentBox">
              <Grid item container justifyContent={"space-between"}>
                <Grid item>
                  <Grid item container columnGap={2}>
                    <Grid item>
                      <Grid item container columnGap={2}>
                        <img src={videoplayercontrolsIcon} alt="icon" />
                        <p className="subTextTwo fontWeight-700 color-secondary-light">
                          {/* {value.lessonTitle ? `Lesson` : `Quiz`} */}
                        </p>
                      </Grid>
                    </Grid>
                    <Grid item display={{ xs: "none", sm: "block" }}>
                      <p className="subTextTwo">
                        {value.lessonTitle ?? value.quizTitle}
                      </p>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid item container columnGap={2}>
                    <Button
                      sx={{ minWidth: "initial", padding: 0 }}
                      onClick={() => {
                        sessionStorage.setItem(
                          "contentToBeEditID",
                          value?.lessonId ?? value?.quizId
                        );
                        setCloseQuizClicked(true);
                        editCourseContent(value?.lessonId ?? value?.quizId);
                      }}
                    >
                      <img src={peneditIcon} />
                    </Button>
                    <Button sx={{ minWidth: "initial", padding: 0 }}>
                      <img src={arrowsexpandIcon} />
                    </Button>
                    <Button
                      sx={{ minWidth: "initial", padding: 0 }}
                      onClick={() => {
                        removeCourseContent(value?.lessonId ?? value?.quizId);
                      }}
                    >
                      <img src={deleteBinIcon} />
                    </Button>
                  </Grid>
                </Grid>
                <Grid item xs={12} display={{ xs: "block", sm: "none" }}>
                  <Grid
                    item
                    container
                    paddingTop={2}
                    paddingLeft={4}
                    paddingRight={4}
                  >
                    <p className="subTextTwo">
                      {value.lessonTitle ?? value.quizTitle}
                    </p>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </div>
      ))}
      {/* </Draggable> */}
    </>
  );
}

DragCard.propTypes = {
  courseContent: PropTypes.array,
  quizContent: PropTypes.array,
  editCourseContent: PropTypes.func,
  removeCourseContent: PropTypes.func,
  setCloseQuizClicked: PropTypes.func,
  courseContentOrder: PropTypes.array,
  setCourseContentOrder: PropTypes.func,
};

export default DragCard;
