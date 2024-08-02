// src/components/Banner.js
import React from "react";
import styled from "styled-components";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const BannerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
`;

const Image = styled.img`
  width: 100%;
  height: 500px;
`;

const Point = styled.a`
  position: absolute;
  width: 100px;
  height: 100px;
  //   background-color: var(--primary) !important;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    transform: scale(1.5);
  }
`;

const Banner = ({ src, pointsData }) => (
  <BannerWrapper>
    <Image src={src} alt="Banner" />
    {pointsData?.map((point, index) => (
      <React.Fragment key={index}>
        <Point
          key={point.id}
          data-tooltip-id={`point-${point.id}`}
          data-tooltip-html={`
            <div style="padding: 10px; max-width: 220px; background-color: #fff; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
              <h4 style="margin: 0 0 8px; font-size: 16px; color: #333;">${point.title}</h4>
              <p style="margin: 4px 0; font-size: 14px; color: #555;">
                <strong>Price:</strong> ${point.price}
              </p>
              <p style="margin: 4px 0; font-size: 14px; color: #555;">
                <strong>Rating:</strong> ${point.totalRating}
              </p>
            </div>
          `}
          style={{ top: point.top, left: point.left }}
          href={point.url}
        />
        <Tooltip id={`point-${point.id}`} />
      </React.Fragment>
    ))}
  </BannerWrapper>
);

export default Banner;
