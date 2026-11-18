import { Fragment } from "react";
import st from "./resume.module.css";
import { contact, education, experience, projects, skills } from "./resume-data";

export default function ResumeBody() {
  return (
    <>
      <h1 className={st.name}>James M. Smith</h1>
      <p className={st.contact}>
        {contact.map((c, i) => (
          <Fragment key={c.label}>
            {i > 0 && <span className={st.sep}>|</span>}
            {c.href ? <a href={c.href}>{c.label}</a> : c.label}
          </Fragment>
        ))}
      </p>

      <h2 className={st.h2}>Education</h2>
      <div className={st.entry}>
        <div className={st.row}><span className={st.title}>{education.school}</span><span>{education.date}</span></div>
        <div className={st.row}><span className={st.it}>{education.degree}</span><span className={st.it}>{education.place}</span></div>
        <ul className={st.bullets}>
          {education.bullets.map(([k, v]) => <li key={k}><b>{k}</b> {v}</li>)}
        </ul>
      </div>

      <h2 className={st.h2}>Experience</h2>
      {experience.map((e) => (
        <div key={e.title + e.org} className={st.entry}>
          <div className={st.row}><span className={st.title}>{e.title}</span><span>{e.date}</span></div>
          <div className={st.row}><span className={st.it}>{e.org}</span><span className={st.it}>{e.place}</span></div>
          <ul className={st.bullets}>{e.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
        </div>
      ))}

      <h2 className={st.h2}>Projects</h2>
      {projects.map((p) => (
        <div key={p.name} className={st.entry}>
          <div className={st.row}><span><span className={st.title}>{p.name}</span> | <span className={st.it}>{p.tech}</span></span><span>{p.date}</span></div>
          <ul className={st.bullets}>{p.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
        </div>
      ))}

      <h2 className={st.h2}>Technical Skills</h2>
      <p className={st.skills}>
        {skills.map(([k, v]) => <Fragment key={k}><b>{k}</b>: {v}<br /></Fragment>)}
      </p>
    </>
  );
}
