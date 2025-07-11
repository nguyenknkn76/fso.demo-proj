import type { JSX } from "react";

interface HeaderProps {
  cname: string;
}
interface ContentProps {
  cparts: CoursePart[];
}
interface TotalProps {
  ctotal: number;
}
interface PartProps {
  cpart: CoursePart;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}
interface CoursePartDescription extends CoursePartBase{
  description: string;
}
interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}
interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}
interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}
interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[],
  kind: "special"
}

type CoursePart = CoursePartBackground | CoursePartBasic | CoursePartGroup | CoursePartSpecial;

const Part = (props: PartProps): JSX.Element =>{
  const part = props.cpart;
  switch (part.kind){
    case 'basic': 
      return <>{part.name} : {part.exerciseCount} <strong>{part.kind}</strong></>
    case 'background':
      return <>{part.name} : {part.exerciseCount} <strong>{part.kind}</strong></>
    case 'group': 
      return <>{part.name} : {part.exerciseCount} <strong>{part.kind}</strong></>
    case 'special':
      return <>{part.name} : {part.exerciseCount} <strong>{part.kind}</strong></>
    default: 
      return <>something went wrong! nothing to display</>
  }
}
const Header = (props: HeaderProps): JSX.Element => {
  return(
    <h1>
      {props.cname}
    </h1>
  )
}

const Content = (props: ContentProps): JSX.Element => {
  return(
    <ul>
      {props.cparts.map(p => 
        <li key={p.name}>
          <Part cpart={p}/>
        </li>
      )}
    </ul>
  )
}

const Total = (props: TotalProps) => {
  return(
    <div>
      Number of exercises {props.ctotal}
    </div>
  )
}
const App = () => {
  const courseName: string = "Half Stack application development";
  const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    kind: "special"
  }
  
];

  const totalExercises:number = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header cname={courseName}/>
      <Content cparts={courseParts}/>
      <Total ctotal={totalExercises}/>
    </div>
  );
};

export default App;