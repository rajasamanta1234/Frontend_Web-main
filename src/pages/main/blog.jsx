// import { GuestGuard } from "../../../guards/student/guest-guard";
import Seo from "@/components/common/seo";
import blogOne from "@/assets/images/blog/1.png";
import blogTwo from "@/assets/images/blog/2.png";
import blogThree from "@/assets/images/blog/3.png";
import blogFour from "@/assets/images/blog/4.png";
import { Grid } from "@mui/material";

const metaTags = [
  { name: "Metaname1", content: "content1" },
  { name: "Metaname2", content: "content2" },
];

export function Component() {
  return (
    <>
      <Seo title="Blog" metaName="Metaname" metaTags={metaTags}>
        <div className="subpageBanner">
          <div className="container">
            <h1>The LightForth Blog</h1>
            <h4>Catch up on our latest news</h4>
          </div>
        </div>

        <div className="blogListing">
          <div className="container">
            <div className="blogRow">
              <div className="blogCol">
                <div className="blogColInner">
                  <div className="imgBlock">
                    <img src={blogOne} alt="blog-img" />
                  </div>
                  <div className="contentBlock">
                    <p className="subTextThree">Consectetur augue turpis tellus erat sapien. Nec id fermentum.</p>
                    <p className="subTextOne">By Lightforth Team on January 27,2023</p>
                  </div>
                </div>
              </div>
              <div className="blogCol">
                <div className="blogColInner">
                  <div className="imgBlock">
                    <img src={blogTwo} alt="blog-img" />
                  </div>
                  <div className="contentBlock">
                    <p className="subTextThree">Pretium ac quis viverra ultrices elit turpis quisque. Volutpat.</p>
                    <p className="subTextOne">By Sopa Team on January 25,2023</p>
                  </div>
                </div>
              </div>
              <div className="blogCol">
                <div className="blogColInner">
                  <div className="imgBlock">
                    <img src={blogThree} alt="blog-img" />
                  </div>
                  <div className="contentBlock">
                    <p className="subTextThree">Condimentum quam sit id nulla a facilisi diam feugiat aliquam.</p>
                    <p className="subTextOne">By Sopa Team on January 25,2023</p>
                  </div>
                </div>
              </div>
              <div className="blogCol">
                <div className="blogColInner">
                  <div className="imgBlock">
                    <img src={blogFour} alt="blog-img" />
                  </div>
                  <div className="contentBlock">
                    <p className="subTextThree">Convallis integer cras bibendum purus nam donec sapien vel.</p>
                    <p className="subTextOne">By Sopa Team on December 30,2022</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Seo>
    </>
  );
}

Component.displayName = "blog";
