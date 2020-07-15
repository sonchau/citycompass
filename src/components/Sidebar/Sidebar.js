import React from "react";
import { Menu} from "antd";
import styled from "styled-components";

const MenuTitle = styled.span`
  position: relative;
` 
const MenuTitleStrong = styled.strong`
  position: relative;
` 

const Sidebar = ({ pageDirectory, handlMenuItemClick, handleItemTitleClick }) => {
  return (
    <Menu onClick={handlMenuItemClick} mode="vertical">
      {pageDirectory.map((a, index) => (
        <Menu.ItemGroup 
          title={a["a_title"] ?<MenuTitleStrong>{a["a_title"]}</MenuTitleStrong> : a["a_title"]}
          key={index}>
          {a.b.map((b, i) =>
            b.c.length ? (
              <Menu.SubMenu
                key={`${b["page_code"]}-${i}}`}
                title={<MenuTitle>{b["b_title"]}</MenuTitle>}
                onTitleClick={() => handleItemTitleClick(
                  {
                    page_titles: {
                      a_title: a["a_title"],
                      b_title: b["b_title"],
                    },
                    page_filters: b["page_filters"],
                  },
                  b["page_code"]
                )}
              >
                {b.c.map((c) => {
                  return c.d.length ? (
                    <Menu.ItemGroup 
                      key={c["c_title"]} 
                      title={c["c_title"] ? <MenuTitleStrong>{c["c_title"]}</MenuTitleStrong> : c["c_title"]}
                      >
                      {c.d.map((d) => (
                        <Menu.Item
                          key={d["page_code"]}
                          data={{
                            pageMetaData: {
                              page_titles: {
                                a_title: a["a_title"],
                                b_title: b["b_title"],
                                c_title: c["c_title"],
                                d_title: d["d_title"],
                              },
                              page_filters: d["page_filters"],
                            },
                            page_code: d["page_code"]
                          }}
                        >
                          <MenuTitle>{d["d_title"]}</MenuTitle>
                        </Menu.Item>
                      ))}
                    </Menu.ItemGroup>
                  ) : (
                      <Menu.Item
                        key={c["page_code"]}
                        data={{
                          pageMetaData: {
                            page_titles: {
                              a_title: a["a_title"],
                              b_title: b["b_title"],
                              c_title: c["c_title"],
                            },
                            page_filters: c["page_filters"],
                          },
                          page_code: c["page_code"]
                        }}
                      >
                      <MenuTitle>{c["c_title"]}</MenuTitle>
                      </Menu.Item>
                    );
                })}
              </Menu.SubMenu>
            ) : (
                <Menu.Item
                  key={b["page_code"]}
                  data={{
                    pageMetaData: {
                      page_titles: {
                        a_title: a["a_title"],
                        b_title: b["b_title"],
                      },
                      page_filters: b["page_filters"],
                    },
                    page_code: b["page_code"]
                  }}
                >
                  <MenuTitle>{b["b_title"]}</MenuTitle>
            </Menu.Item>))}
        </Menu.ItemGroup>
      ))}
    </Menu>
  );
};

export default Sidebar;
