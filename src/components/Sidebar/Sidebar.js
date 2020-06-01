import React from "react";
import { Menu } from "antd";
import { useHistory } from "react-router-dom";

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
      <Menu.SubMenu key={b["page_code"]} title={b["b_title"]}>
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

// return (
//   <React.Fragment>
//     {pageDirectory.map((a) => (
//       <React.Fragment key={a["a_level"]}>
//         <h2 style={{ padding: "2rem 1.6rem 0rem 3.6rem" }}>
//           {" "}
//           {a["a_title"]}
//         </h2>
//         {a.b.map((b) => (
//           <ul className="mainMenu">
//             <li>
//               {!b.c.length ? (
//                 <NavLink
//                   onClick={() =>
//                     setPageMetaData({
//                       a_title: a["a_title"],
//                       b_title: b["b_title"],
//                     })
//                   }
//                   to={`/${clientName}/${b["page_code"]}`}
//                   activeClassName="selected"
//                 >
//                   {b["b_title"]}
//                 </NavLink>
//               ) : (
//                 <React.Fragment>
//                   <NavLink
//                     onClick={() =>
//                       setPageMetaData({
//                         a_title: a["a_title"],
//                         b_title: b["b_title"],
//                       })
//                     }
//                     to={`/${clientName}/${b["page_code"]}`}
//                   >
//                     <span
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                       }}
//                     >
//                       <span>{b["b_title"]} </span>
//                       <span>
//                         <FontAwesomeIcon icon={faChevronRight} />
//                       </span>
//                     </span>
//                   </NavLink>{" "}
//                 </React.Fragment>
//               )}

//               <ul>
//                 {b.c.map((c) => (
//                   <li>
//                     {!c.d.length ? (
//                       <NavLink
//                         onClick={() =>
//                           setPageMetaData({
//                             a_title: a["a_title"],
//                             b_title: b["b_title"],
//                             c_title: c["c_title"],
//                           })
//                         }
//                         to={`/${clientName}/${c["page_code"]}`}
//                       >
//                         {c["c_title"]}
//                       </NavLink>
//                     ) : (
//                       // <NavLink to={c["page_code"]}>
//                       //   <h3>{c["c_title"]}</h3>
//                       // </NavLink>

//                       <h3 style={{ padding: "2rem 1.6rem 0rem 3.6rem" }}>
//                         {c["c_title"]}
//                       </h3>
//                     )}

//                     {c.d.map((d) => (
//                       <li>
//                         <NavLink
//                           onClick={() =>
//                             setPageMetaData({
//                               a_title: a["a_title"],
//                               b_title: b["b_title"],
//                               c_title: c["c_title"],
//                               d_title: d["d_title"],
//                             })
//                           }
//                           to={`/${clientName}/${d["page_code"]}`}
//                           activeClassName="selected"
//                         >
//                           {d["d_title"]}
//                         </NavLink>
//                       </li>
//                     ))}
//                   </li>
//                 ))}
//               </ul>
//             </li>
//           </ul>
//         ))}
//       </React.Fragment>
//     ))}
//   </React.Fragment>
// );
