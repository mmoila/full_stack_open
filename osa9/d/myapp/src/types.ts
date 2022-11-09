export interface HeaderProps {
  name: string;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseDescriptionPart extends CoursePartBase {
  description: string;
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseNormalPart extends CourseDescriptionPart {
  type: "normal";
}

interface CourseSubmissionPart extends CourseDescriptionPart {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseRequirementsPart extends CourseDescriptionPart {
  type: "special";
  requirements: string[]
}

export type CoursePart = CourseNormalPart
  | CourseProjectPart 
  | CourseSubmissionPart
  | CourseRequirementsPart;

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
