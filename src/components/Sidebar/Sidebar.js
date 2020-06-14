import React from "react";
import { Menu } from "antd";
import { useHistory } from "react-router-dom";

const Sidebar = ({ pageDirectory, clientName, setPageMetaData }) => {
  let history = useHistory();

  // Use "props" through menu items, that way we don't invoke the functions
  const handleItemClick = (e) => {
console.log(e)
    // history.push(`/${clientName}/${page_code}`);
    // setPageMetaData(pageMetaData);
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
        key={`${b["page_code"]}-${i}}`}
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
        onTitleClick={handleItemClick}
        title={b["b_title"]}
      >
        {b.c.map((c) => {
          return c.d.length ? (
            <Menu.ItemGroup key={c["c_title"]} title={c["c_title"]}>
              {c.d.map((d) => (
                <Menu.Item
                  // TODO: move handleItemClick params out to the key and use that in the callback: see docs for ant.design
                  key={d["page_code"]}
                  data={{
                    pageMetaData:       {
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
                  onClick={handleItemClick}
                >
                  {d["d_title"]}
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
                onClick={handleItemClick}
            >
              {c["c_title"]}
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
          onClick={handleItemClick}
      >
        {b["b_title"]}
      </Menu.Item>
    )
  );
}
