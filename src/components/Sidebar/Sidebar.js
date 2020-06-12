import React from "react";
import { Menu } from "antd";
import { useHistory } from "react-router-dom";

const Sidebar = ({ pageDirectory, clientName, setPageMetaData }) => {
  pageDirectory.log("pageDirectory");
  let history = useHistory();
  const handleItemClick = (pageMetaData, pageCode) => {
    history.push(`/${clientName}/${pageCode}`);
    setPageMetaData(pageMetaData);
  };
  return (
    <Menu mode="vertical">
      {pageDirectory.map((a, index) => (
        <Menu.ItemGroup title={a["a_title"]} key={index}>
          {renderMenu(a, handleItemClick)}
        </Menu.ItemGroup>
      ))}
    </Menu>
  );
};

export default Sidebar;

function renderMenu(a, handleItemClick) {
  return a.b.map((b, i) =>
    b.c.length ? (
      <Menu.SubMenu
        onTitleClick={() =>
          handleItemClick(
            {
              page_titles: {
                a_title: a["a_title"],
                b_title: b["b_title"],
              },
              page_filters: b["page_filters"],
            },
            b["page_code"]
          )
        }
        key={`${b["page_code"]}-${i}}`}
        title={b["b_title"]}
      >
        {b.c.map((c) => {
          return c.d.length ? (
            <Menu.ItemGroup title={c["c_title"]}>
              {c.d.map((d) => (
                <Menu.Item
                  // TODO: move handleItemClick params out to the key and use that in the callback: see docs for ant.design
                  key={d["page_code"]}
                  onClick={() =>
                    handleItemClick(
                      {
                        page_titles: {
                          a_title: a["a_title"],
                          b_title: b["b_title"],
                          c_title: c["c_title"],
                          d_title: d["d_title"],
                        },
                        page_filters: d["page_filters"],
                      },
                      d["page_code"]
                    )
                  }
                >
                  {d["d_title"]}
                </Menu.Item>
              ))}
            </Menu.ItemGroup>
          ) : (
            <Menu.Item
              key={c["page_code"]}
              onClick={() =>
                handleItemClick(
                  {
                    page_titles: {
                      a_title: a["a_title"],
                      b_title: b["b_title"],
                      c_title: c["c_title"],
                    },
                    page_filters: c["page_filters"],
                  },
                  c["page_code"]
                )
              }
            >
              {c["c_title"]}
            </Menu.Item>
          );
        })}
      </Menu.SubMenu>
    ) : (
      <Menu.Item
        key={b["page_code"]}
        onClick={() =>
          handleItemClick(
            {
              page_titles: {
                a_title: a["a_title"],
                b_title: b["b_title"],
              },
              page_filters: b["page_filters"],
            },
            b["page_code"]
          )
        }
      >
        {b["b_title"]}
      </Menu.Item>
    )
  );
}
