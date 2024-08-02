import * as React from "react";
import AccordionGroup from "@mui/joy/AccordionGroup";
import Accordion from "@mui/joy/Accordion";
import AccordionDetails from "@mui/joy/AccordionDetails";
import AccordionSummary from "@mui/joy/AccordionSummary";

export const AccordionComponent = ({ title, Content }) => {
  return (
    <>
      <AccordionGroup sx={{ background: "var(--bright)", mb:3 }}>
        <Accordion defaultExpanded={true} sx={{ padding: "0px" }}>
          <AccordionSummary sx={{ padding: "0px 25px" }}>
            {title}
          </AccordionSummary>
          <AccordionDetails>{Content}</AccordionDetails>
        </Accordion>
      </AccordionGroup>
    </>
  );
};
