/** @format */

import Image from "next/image";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import leftArrow from "../../../public/Icons/leftArrow.svg";
import filter from "../../../public/Icons/filter.svg";
import CustomButton from "../CustomButton";
import { BATCHES, INDUSTRIES } from "@/utils/constants";

const ResponsiveFilterSection = ({
  applyFilter,
  searchParams,
  router,
  setIsLoading,
  createProfileRef,
  industries,
  setIsMoreDataLoaded,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState("industry");
  const [selectedFilters, setSelectedFilters] = useState({
    is_reap_company: [],
    industry_id: [],
    batch_id: [],
  });

  useEffect(() => {
    if (isOpen) {
      setSelectedFilters({
        is_reap_company: searchParams["is_reap_company"]?.split(",") || [],
        industry_id:
          searchParams["industry_id"]
            ?.split(",")
            ?.map((item) => Number(item)) || [],
        batch_id:
          searchParams["batch_id"]?.split(",")?.map((item) => Number(item)) ||
          [],
      });
    }
  }, [isOpen, searchParams]);

  const toggleFilter = () => setIsOpen(!isOpen);

  const toggleFilterGroup = (groupName) => {
    if (filterOpen !== groupName) {
      setFilterOpen(groupName);
    }
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const onApply = () => {
    const queryParams = new URLSearchParams(window.location.search);
    setIsLoading(true);
    setIsMoreDataLoaded(false);
    Object.entries(selectedFilters).forEach(([key, values]) => {
      if (values.length > 0) {
        queryParams.set(key, values.join(","));
      } else {
        queryParams.delete(key);
      }
    });
    if (!selectedFilters.is_reap_company.length) {
      queryParams.delete("batch_id");
    }
    queryParams.delete("items_per_page");
    queryParams.set("page", 1);
    console.log(queryParams.toString(), "queryParams");
    router.push(`?${queryParams.toString()}`, { scroll: false });
    setIsOpen(false); // close drawer
    setTimeout(() => {
      createProfileRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };
  const onClearFilter = () => {
    setIsLoading(true);
    const newParams = new URLSearchParams();
    setIsMoreDataLoaded(false);
    const newQuery = newParams.toString();
    router.push(`?${newQuery}`, { scroll: false });
    setIsOpen(false); // close drawer
    setTimeout(() => {
      createProfileRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  return (
    <>
      <ResponsiveFilterButton $isVisible onClick={toggleFilter}>
        <Image src={filter} alt="filter" />
      </ResponsiveFilterButton>

      {isOpen && (
        <FilterDrawer>
          <div className="buttonWrapper">
            <DrawerHeader>
              <Image src={leftArrow} alt="Back" onClick={toggleFilter} />
              <div>Filters</div>
            </DrawerHeader>
            <div className="clearFilterButton">
              <CustomButton
                type="link"
                btnText="Clear Filters"
                color="#000"
                onClick={onClearFilter}
              />
            </div>
          </div>

          <FilterContainer>
            <FilterGroup>
              <FilterTitles>
                {["industry", "is_reap_company"]
                  .filter((item) => item)
                  .map((name) => (
                    <FilterTitle
                      key={name}
                      $active={filterOpen === name}
                      onClick={() => toggleFilterGroup(name)}
                    >
                      {name === "is_reap_company"
                        ? "Search Filters"
                        : name.charAt(0).toUpperCase() + name.slice(1)}
                    </FilterTitle>
                  ))}
              </FilterTitles>

              <FilterLabels>
                {filterOpen === "is_reap_company" &&
                  [
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
                  ].map((label, i) => (
                    <CheckboxLabel key={`${label?.id}-${i}`}>
                      <HiddenCheckbox
                        checked={selectedFilters["is_reap_company"]?.includes(
                          label.id
                        )}
                        onChange={() => {
                          setSelectedFilters((prev) => {
                            const current = prev["is_reap_company"] || [];
                            const updated = current.includes(label.id)
                              ? current.filter((val) => val !== label.id)
                              : [...current, label.id];

                            return {
                              ...prev,
                              is_reap_company: updated,
                              batch_id: current.includes(label.id)
                                ? []
                                : prev.batch_id,
                            };
                          });
                        }}
                      />
                      <CustomCheckbox />
                      <span className="label">{label?.name}</span>
                    </CheckboxLabel>
                  ))}

                {filterOpen === "industry" &&
                  industries
                    .map((item) => ({
                      name: item.industry_name,
                      id: item.id,
                    }))
                    .map((label, i) => (
                      <CheckboxLabel key={`${label?.id}-${i}`}>
                        <HiddenCheckbox
                          checked={selectedFilters["industry_id"]?.includes(
                            label.id
                          )}
                          onChange={() => {
                            setSelectedFilters((prev) => {
                              const current = prev["industry_id"] || [];
                              const updated = current.includes(label.id)
                                ? current.filter((val) => val !== label.id)
                                : [...current, label.id];

                              return {
                                ...prev,
                                industry_id: updated,
                              };
                            });
                          }}
                        />
                        <CustomCheckbox />
                        <span className="label">{label?.name}</span>
                      </CheckboxLabel>
                    ))}

                {/* {filterOpen === "region" && (
                  <CheckboxLabel key="region-checkbox">
                    <HiddenCheckbox />
                    <CustomCheckbox />
                    <span className="label">Region</span>
                  </CheckboxLabel>
                )} */}

                {selectedFilters["is_reap_company"]?.includes("true") &&
                filterOpen === "is_reap_company" ? (
                  <>
                    <FilterTitle>Cohort</FilterTitle>
                    {BATCHES.map((item) => ({
                      name: item.batch_name,
                      id: item.id,
                    })).map((label, i) => (
                      <CheckboxLabel key={`${label?.id}-${i}`}>
                        <HiddenCheckbox
                          checked={selectedFilters["batch_id"]?.includes(
                            label.id
                          )}
                          onChange={() => {
                            setSelectedFilters((prev) => {
                              const current = prev["batch_id"] || [];
                              const updated = current.includes(label.id)
                                ? current.filter((val) => val !== label.id)
                                : [...current, label.id];

                              return {
                                ...prev,
                                batch_id: updated,
                              };
                            });
                          }}
                        />
                        <CustomCheckbox />
                        <span className="label">{label?.name}</span>
                      </CheckboxLabel>
                    ))}
                  </>
                ) : (
                  ""
                )}
              </FilterLabels>
            </FilterGroup>
          </FilterContainer>
          <StickyFooter>
            <div className="applyButtonContainer">
              <CustomButton
                type="primary"
                btnText="Apply"
                width="100%"
                height="47px"
                borderRadius="4px"
                onClick={onApply}
              />
            </div>
          </StickyFooter>
        </FilterDrawer>
      )}
    </>
  );
};

export default ResponsiveFilterSection;

const ResponsiveFilterButton = styled.button`
  position: fixed;
  bottom: 1.5rem;
  right: 0;
  transform: translateX(-50%);
  z-index: 11;
  display: none;
  border: none;
  width: max-content;

  @media (max-width: 768px) {
    display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.button.primaryBg || "#000"};
    color: ${({ theme }) => theme.colors.font.body};
    padding: 0.6rem;
    border-radius: 50px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    font-size: 1rem;
  }

  @media (max-width: 425px) {
    bottom: 1rem;
  }
  img {
    width: 20px;
    height: 20px;
  }
`;

const FilterDrawer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: white;
  z-index: 1;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
  padding-bottom: 2rem;
  height: 100vh;

  @media (min-width: 769px) {
    display: none;
  }

  .buttonWrapper {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    .clearFilterButton {
      display: flex;
      margin-right: 16px;
    }
  }
`;

const DrawerHeader = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 1rem;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.font.body};

  img {
    width: 20px;
    height: 20px;
  }
`;

const FilterContainer = styled.div`
  border-radius: 8px;
  max-width: 100%;
  color: ${({ theme }) => theme.colors.font.body};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  height: 100%;
`;

const FilterGroup = styled.div`
  display: flex;
  padding: 1.28125rem 0 1.40625rem;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.border.secondary};
  gap: 1rem;
  height: 100%;

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
  line-height: 23px;
  width: 40%;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  background: ${({ $active }) => ($active ? "white" : "transparent")};
  color: ${({ $active, theme }) =>
    $active ? "#002aff" : theme.colors.font.body};
`;

const FilterTitles = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  background: ${({ $active }) => ($active ? "transparent " : "#eeeeee")};
  color: ${({ $active, theme }) =>
    $active ? "white" : theme.colors.font.body};
  overflow: auto;
  margin-bottom: 5.625rem;

  @media (max-width: 425px) {
    width: 50%;
  }
  @media (max-width: 320px) {
    width: 40%;
  }

  ${FilterTitle} {
    cursor: pointer;
    font-weight: bold;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    width: 100%;
    padding: 1rem;

    @media (max-width: 375px) {
      padding: 1rem 0.75rem;
      font-size: ${({ theme }) => theme.fontSizes.xs};
    }
  }

  ${FilterTitle}:hover {
    text-decoration: none;
  }
`;

const FilterLabels = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  padding-right: 0.75rem;
  overflow: auto;
  margin-bottom: 5.625rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  gap: 3vw;
  cursor: pointer;
  line-height: 23px;
  padding: 1rem 0;

  @media (max-width: 375px) {
    gap: 0.3rem;
  }

  .label {
    letter-spacing: 0px;
    font-size: ${({ theme }) => theme.fontSizes.sm};

    @media (max-width: 375px) {
      font-size: ${({ theme }) => theme.fontSizes.xs};
    }
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
  margin-top: 0.2rem;
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

const StickyFooter = styled.div`
  position: sticky;
  display: flex;
  justify-content: flex-end;
  bottom: 0;
  background-color: white;
  padding: 0.5rem;
  /* border-top: 1px solid ${({ theme }) => theme.colors.border.secondary}; */

  .applyButtonContainer {
    display: flex;
    justify-content: flex-end;
    max-width: 280px;
    width: 100%;

    @media (max-width: 425px) {
      max-width: 100%;
    }
  }
  .apply-button {
    width: 100%;
    background-color: ${({ theme }) => theme.colors.button.primaryBg || "#000"};
    color: white;
    padding: 0.75rem;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
  }
`;
