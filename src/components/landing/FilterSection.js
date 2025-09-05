/** @format */

import Image from "next/image";
import React, { useState } from "react";
import styled from "styled-components";
import upArrow from "../../../public/Icons/upArrow.svg";
import downArrow from "../../../public/Icons/downArrow.svg";
import { BATCHES, INDUSTRIES } from "@/utils/constants";

const FilterSection = ({ applyFilter, searchParams, industries }) => {
  const [openFilters, setOpenFilters] = useState({
    is_reap_company: true,
    industry_id: true,
    Region: false,
    batch_id: true,
  });

  const toggleFilter = (title) => {
    setOpenFilters((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <FilterContainer>
      {[
        {
          title: "Industry",
          labels: industries.map((item) => ({
            name: item.industry_name,
            id: item.id,
          })),
          key: "industry_id",
        },

        // {
        //   title: "Region",
        //   labels: [],
        // },
        {
          title: "",
          labels: [
            {
              name: "Reap Companies",
              id: "true",
            },
            // {
            //   name: "Non Reap Companies",
            //   id: "false",
            // },
            // "Top Revenue Companies",
            // "Exits",
          ],
          key: "is_reap_company",
        },
        searchParams["is_reap_company"]?.includes("true")
          ? {
              title: "Cohort",
              labels: BATCHES.map((item) => ({
                name: item.batch_name,
                id: item.id,
              })),
              key: "batch_id",
            }
          : {},
      ]
        .filter((item) => item.key)
        .map(({ title, labels, key: filterKey }) => (
          <FilterGroup
            key={title}
            // style={{
            //   paddingBottom: !title ? "0" : "",
            //   border: !title ? "0" : "",
            // }}
          >
            {title && (
              <FilterTitle onClick={() => toggleFilter(filterKey)}>
                {title}
                <span>
                  {openFilters[filterKey] ? (
                    <Image
                      src={upArrow}
                      className="upArrowIcon"
                      alt="Collapse"
                    />
                  ) : (
                    <Image
                      src={downArrow}
                      className="downArrowIcon"
                      alt="Expand"
                    />
                  )}
                </span>
              </FilterTitle>
            )}
            <CheckboxList className={openFilters[filterKey] ? "show" : "hide"}>
              {labels.map((label) => (
                <CheckboxLabel
                  key={label?.id || label}
                  style={{ marginTop: !title ? "0" : "" }}
                >
                  <HiddenCheckbox
                    checked={(
                      searchParams[filterKey]?.split(",") || []
                    ).includes(String(label.id))}
                    onChange={() => applyFilter(filterKey, String(label.id))}
                  />
                  <CustomCheckbox />
                  <span className="label">{label?.name || label}</span>
                </CheckboxLabel>
              ))}
            </CheckboxList>
          </FilterGroup>
        ))}
    </FilterContainer>
  );
};

export default FilterSection;

const FilterContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: 8px;
  padding: 1.59375rem 1.655625rem 2.140625rem 1.655625rem;
  min-width: 260px;
  max-width: 308px;
  color: ${({ theme }) => theme.colors.font.body};
  margin-bottom: 1.875rem;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  height: fit-content;
  //  -------- sticky side nav ---------
  position: sticky;
  top: 100px;
  align-self: start;
  z-index: 2;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const FilterGroup = styled.div`
  padding: 1.28125rem 0 1.40625rem;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.border.secondary};

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const FilterTitle = styled.div`
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 23px;

  .upArrowIcon {
    width: 20px;
    height: 10px;
  }
  .downArrowIcon {
    width: 20px;
    height: 10px;
  }
`;

const CheckboxList = styled.div`
  &.show {
    display: block;
  }
  &.hide {
    display: none;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: 1.3125rem;
  line-height: 23px;

  .label {
    letter-spacing: 0px;
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  opacity: 0;
  position: absolute;
  pointer-events: none;
`;

const CustomCheckbox = styled.span`
  width: 16px;
  height: 16px;
  min-width: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border.teritary};
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.cardSecondaryBg};
  margin-right: 0.625rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.2s ease;

  ${HiddenCheckbox}:checked + & {
    background-color: ${({ theme }) => theme.colors.cardSecondaryBg};
  }

  ${HiddenCheckbox}:checked + &::after {
    content: "";
    width: 2px;
    height: 6px;
    border: solid ${({ theme }) => theme.colors.border.teritary};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    display: block;
  }
`;
