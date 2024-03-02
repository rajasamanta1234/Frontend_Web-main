import { Helmet } from "react-helmet-async";
import { PropTypes } from "prop-types";

const Seo = ({
  children,
  title = "Lightforth",

  id = "page-id",
  metaTags = [],
}) => {
  const renderedMetaTags = metaTags.map((metaTag, index) => (
    <meta key={index} name={metaTag.name} content={metaTag.content} />
  ));
  return (
    <div id={id}>
      <Helmet>
        <title>{`Lightforth - ${title}`}</title>
        {renderedMetaTags}
      </Helmet>
      {children}
    </div>
  );
};
export default Seo;

Seo.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  id: PropTypes.string,
  metaTags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
};
