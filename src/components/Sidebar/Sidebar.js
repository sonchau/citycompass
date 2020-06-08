import React from "react";
import { Menu } from "antd";
import { useHistory } from "react-router-dom";

import { MessageOutlined } from "@ant-design/icons";

const Sidebar = ({ pageDirectory, clientName, setPageMetaData }) => {
  let history = useHistory();
  const handleItemClick = (titles, pageCode) => {
    history.push(`/${clientName}/${pageCode}`);
    setPageMetaData(titles);
  };
  return (
    <Menu mode="vertical">
      {pageDirectory.map((a) => (
        <Menu.ItemGroup title={a["a_title"]}>
          {renderMenu(a, handleItemClick)}
        </Menu.ItemGroup>
      ))}
    </Menu>
  );
};

export default Sidebar;

function renderMenu(a, handleItemClick) {
  return a.b.map((b) =>
    b.c.length ? (
      <Menu.SubMenu
        onTitleClick={() =>
          handleItemClick(
            {
              a_title: a["a_title"],
              b_title: b["b_title"],
            },
            b["page_code"]
          )
        }
        key={b["page_code"]}
        title={b["b_title"]}
        icon=""
      >
        {b.c.map((c) => {
          return c.d.length ? (
            <Menu.ItemGroup title={c["c_title"]}>
              {c.d.map((d) => (
                <Menu.Item
                  key={d["page_code"]}
                  onClick={() =>
                    handleItemClick(
                      {
                        a_title: a["a_title"],
                        b_title: b["b_title"],
                        c_title: c["c_title"],
                        d_title: d["d_title"],
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
                    a_title: a["a_title"],
                    b_title: b["b_title"],
                    c_title: c["c_title"],
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
              a_title: a["a_title"],
              b_title: b["b_title"],
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
