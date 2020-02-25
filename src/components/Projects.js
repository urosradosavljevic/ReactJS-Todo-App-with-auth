import React, { useState } from "react";
import PropTypes from "prop-types"
import { useSelectedProjectValue, useProjectsValue } from "../context";
import { IndividualProject } from "./IndividualProject";
import { ListItem } from "@material-ui/core";

export const Projects = ({ activeValue = null }) => {
  const [active, setActive] = useState(activeValue);
  const { setSelectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();

  return (
    projects &&
    projects.map(project => (
      <ListItem
        button
        key={project.projectId}
        data-doc-id={project.docId}
        selected={active === project.projectId}
        onClick={() => {
          setActive(project.projectId);
          setSelectedProject(project.projectId);
        }}
        aria-label={`Select ${project.name} as the task project`}
      >
        <IndividualProject project={project} />
      </ListItem>
    ))
  );
};

Projects.propTypes = {
  activeValue: PropTypes.bool
}