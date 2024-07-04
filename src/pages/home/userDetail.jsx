import React, {useState, useEffect} from "react";
import * as Data from "../data";
import styles from './styles.module.css'
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from "@mui/lab/TabPanel";
import TabList from '@mui/lab/TabList';
import TabContext from "@mui/lab/TabContext";
import Loader from "../../components/loader";
import * as Const from "../../utils/Cons";
import RitualTable from "../../components/table/ritual";
import Link from "@mui/material/Link";
import * as Utils from "../../utils/utils";
import {ReactComponent as ShareLink} from "../../assets/link.svg";


function UserDetail({rowData}) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{width: '100%'}}>
      <TabContext value={value}>
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab style={{textTransform: 'none', color: "black"}} label="DKG Rituals" value="1"/>
          </TabList>
        </Box>
        <TabPanel value="1">{RitualPanel(rowData)}</TabPanel>
      </TabContext>
    </Box>
  );
}

function RitualPanel(rowData){
  return (<RitualTable
    columns={Data.ritual_columns}
    data={rowData}
    isLoading={false}
    network={Const.DEFAULT_NETWORK}
  />);
}

const UserDetailPage = () => {
  const [pageData, setPageData] = useState({
    rowData: [],
    isLoading: true,
  });
  const [user, setUser] = useState();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const user = query.get("user");
    setUser(user);

    Data.getUserDetail(user).then((info) => {1
      const array = [...info.rituals];
      console.log("array: ", array)
      setPageData({
        isLoading: false,
        rowData: Data.formatRitualsData(array),
      });
    });

  }, []);

  return (
    <>
      {
        pageData.isLoading ? (
          <div style={{textAlign: "center"}}>
            <Loader/>
          </div>
        ) : (
          <div>
            <div className={styles.staker_detail_header}>
              <div className={styles.staker_detail_header_address}>
                <h3>
                  <Link
                    target="_blank"
                    underline="hover"
                    href={Utils.getPolygonScanAddressLink() + user}
                    className={styles.link}
                  >
                    {Data.formatString(user)}
                    <ShareLink/>
                  </Link>
                </h3>
                <span>user</span>
              </div>
                <div className={styles.staker_detail_header_value}>
                  <div className={styles.staker_detail_header_value_item}>
                    <div className={styles.staker_detail_header_value_item_lable}>
                      DKG rituals authority
                    </div>
                    <div>
                      <div>{pageData.rowData.length}</div>
                    </div>
                  </div>
                </div>
            </div>
            <UserDetail rowData={pageData.rowData}/>
          </div>
        )
      }
    </>
  );
}

export default UserDetailPage;