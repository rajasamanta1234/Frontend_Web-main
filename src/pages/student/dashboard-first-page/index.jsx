import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ZodError } from "zod";
import { toast } from "react-toastify";
import { AuthGuard } from "../../../guards/student/auth-guard";
import Seo from "@/components/common/seo";
import { forgotPassword } from "@/validation/student/auth";
import { handelError } from "@/helpers/common";
// import { useForgotPaswwordStudentMutation } from "@/redux/api/student/auth";
import {
  useGetLearningMutation,
  useLearningUpdateMutation,
} from "../../../redux/api/student/dashboard";

import { Box, Button, Grid } from "@mui/material";

const metaTags = [
  { name: "Metaname1", content: "content1" },
  { name: "Metaname2", content: "content2" },
];

export function Component() {
  const navigate = useNavigate();

  const [getLearningOption, { data: dataList }] = useGetLearningMutation();
  const [update, { isError, isSuccess, error, data, isLoading }] =
    useLearningUpdateMutation();

  const [allchecked, setAllChecked] = useState([]);
  function handleChange(e) {
    if (e.target.checked) {
      setAllChecked([...allchecked, e.target.value]);
    } else {
      setAllChecked(allchecked.filter((item) => item !== e.target.value));
    }
  }
  const handelSubmit = async () => {
    // _e.preventDefault();
    console.log(allchecked);

    if (allchecked?.length <= 1) {
      toast.error("Please select two or more option");
      return;
    }

    // try {
    //   forgotPassword.parse(formData);
    // } catch (error) {
    //   if (error instanceof ZodError) {
    //     handelError(error, setFormData);
    //   }
    //   return;

    update({
      courseIds: allchecked,
    });
  };

  useEffect(() => {
    getLearningOption();
  }, []);

  useEffect(() => {
    if (isSuccess && data) {
      toast.success(data?.message);

      navigate(`/student/dashboard`);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  return (
    <AuthGuard>
      <Seo title="Learning" metaName="Metaname" metaTags={metaTags}>
        <Grid
          container
          minHeight={"100vh"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Grid item>
            <Grid
              item
              container
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Grid item textAlign={"center"}>
                <h3>What are you learning?</h3>
                <p className="mainText color-Neutral-600 fontWeight-400">
                  Choose two or more options
                </p>
              </Grid>
              <Grid item width={450}>
                <Grid
                  item
                  padding={"50px 0 145px"}
                  container
                  spacing={2}
                  justifyContent={"center"}
                  className="learningCheckbox"
                >
                  {dataList?.data?.map((e, index) => {
                    return (
                      <Grid item key={index}>
                        <Box>
                          <input
                            type="checkbox"
                            value={e.id}
                            onChange={handleChange}
                          />

                          <span>
                            <img src={e?.image} width={15} /> {e.name}
                          </span>
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
              <Grid item>
                <Button
                  className="roundedBtn"
                  variant="contained"
                  color="primary"
                  onClick={handelSubmit}
                >
                  Continue
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Seo>
    </AuthGuard>
  );
}

Component.displayName = "StudentDashboardFirst";
