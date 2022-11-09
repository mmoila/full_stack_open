import CSS from "csstype";
import { CoursePart, assertNever } from "../types";


const style: CSS.Properties = {
  display: "block"
};

const paragraphStyle: CSS.Properties = {
  margin: 0,
  padding: 0
};

const headingStyle: CSS.Properties = {
  margin: "1em 0 0 0"
};

const Content = ({courseParts}: {courseParts: CoursePart[]}) => {
  let renderList: JSX.Element[] = [];

  courseParts.forEach(part => {
    const basicData = 
    <p style={headingStyle}>
      <b>{part.name} {part.exerciseCount}</b>
    </p>;

    switch(part.type) {
      case "normal":
        renderList = renderList.concat(
          <div style={style} key={part.name}>
            {basicData} 
            <p style={paragraphStyle}><i>{part.description}</i></p>
          </div>
        );
        break;
      case "groupProject":
        renderList = renderList.concat(
          <div key={part.name}>
            {basicData} 
            <p style={paragraphStyle}>
              project exercises: {part.groupProjectCount}
            </p>
          </div>
        );
        break;
      case "submission":
        renderList = renderList.concat(
          <div key={part.name}>
            {basicData} 
            <p style={paragraphStyle}><i>{part.description}</i></p>
            <p style={paragraphStyle}>
              submit to {part.exerciseSubmissionLink}
            </p>
          </div>
        );
        break;
      case "special":
        renderList = renderList.concat(
          <div key={part.name}>
            {basicData} 
            <p style={paragraphStyle}><i>{part.description}</i></p>
            <p style={paragraphStyle}>
              required skills: {part.requirements.join(", ")}
            </p>
          </div>
        );
        break;
      default:
        assertNever(part);
    }
  });

  return (
    <div>
      {renderList}
    </div>
  );
};


export default Content;