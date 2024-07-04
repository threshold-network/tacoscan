import React, {useState, useEffect} from "react";
import * as Data from "../data";
import styles from './styles.module.css'
import { ReactComponent as Copy } from "../../assets/copy.svg";
import * as Const from '../../utils/Cons';
import {ReactComponent as ShareLink} from "../../assets/link.svg";
import Link from "@mui/material/Link";
import * as Utils from "../../utils/utils";
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from "@mui/lab/TabPanel";
import TabList from '@mui/lab/TabList';
import TabContext from "@mui/lab/TabContext";
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import {TIME_LOCK_DEAUTHORIZATION} from "../../utils/Cons";
import Loader from "../../components/loader";
import Tooltip from "@mui/material/Tooltip";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import RitualTable from "../../components/table/ritual";

function StakerDetail({staker, stakingProvider}) {
    const [value, setValue] = React.useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{width: '100%'}}>
            <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab style={{textTransform: 'none', color: "black"}} label="Overview" value="1"/>
                        <Tab style={{textTransform: 'none', color: "black"}} label="DKG Rituals" value="2"/>
                    </TabList>
                </Box>
                <TabPanel value="1" className={styles.staker_detail}>{Overview(staker)}</TabPanel>
                <TabPanel value="2">{DKGRituals(stakingProvider)}</TabPanel>
            </TabContext>
        </Box>
    );
}

function Overview(staker) {
    const copyToClipBoard = (data) => {
        try {
          navigator.clipboard.writeText(data);
        } catch (err) {}
    };

    const formatEventType = (eventType) => {
        return eventType
          .replace(/([a-z])([A-Z])/g, '$1 $2')
          .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
          .replace(/\b\w/g, char => char.toUpperCase());
    };

    const formatEvent = (event, amount) => {
        if (event == undefined)
            return

        switch (event) {
            case "Staked":
                return "Staker staked " + amount + " token."
            case "ToppedUp":
                return "Staker stake more " + amount + " token."
            case "Unstaked":
                return "Staker has unstaked " + amount + " token."
            case "AuthorizationIncreased":
                return "Has been authorized " + amount + " token to the Staking contract."
            case "AuthorizationDecreaseApproved":
                return "Staker has reduced " + amount + " token from Staking contract."
            case "AuthorizationInvoluntaryDecreased":
                return "The Staking Contract has reduced the authorized amount to " + amount + " token."
            case "BondedOperator":
                return "Operator has been bonded with the TACoApplication contract."
        }
    }

    return (
        <div className={styles.staker_detail_overview}>
            <div style={{flex: "1 1 0%"}}>
                <table className={styles.staker_detail_overview_table}>
                    {/* --------- Stake---------*/}
                    <tbody>
                    <tr>
                        <th colSpan="2" style={{fontWeight: "bold"}}>Stake</th>
                    </tr>
                    </tbody>
                    <tbody className={styles.staker_detail_overview_table_tbody}>
                    <tr>
                        <th>Stake</th>
                        <td>
                            {"T " + staker.weiDecimalStakedAmount}
                        </td>
                    </tr>
                    <tr>
                        <th>Staked at</th>
                        <td>
                            {Data.formatDate(staker.stakedAt) ?? "Not yet staked"}
                        </td>
                    </tr>
                    <tr>
                        <th>Operator bonded at</th>
                        <td>
                            {Data.formatDate(staker.bondedAt) ?? "Operator not bonded"}
                        </td>
                    </tr>
                    </tbody>
                    {/* --------- Roles---------*/}
                    <tbody>
                        <tr>
                            <th colSpan="2" style={{fontWeight: "bold"}}>Roles</th>
                        </tr>
                    </tbody>
                    <tbody className={styles.staker_detail_overview_table_tbody}>
                        <tr>
                            <th>Owner</th>
                            <td>
                                <Link
                                    target="_blank"
                                    underline="hover"
                                    href={Utils.getEtherAddressLink() + staker.owner}
                                    className={styles.link}
                                >
                                    {Data.formatString(staker.owner)}
                                    <ShareLink/>
                                </Link>
                                <Tooltip title="Copied">
                                    <Copy
                                        style={{ cursor: "pointer" }}
                                        onClick={(e) => copyToClipBoard(staker.owner)}
                                    />
                                </Tooltip>
                            </td>
                        </tr>
                        <tr>
                            <th>Beneficiary</th>
                            <td>
                                <Link
                                    target="_blank"
                                    underline="hover"
                                    href={Utils.getEtherAddressLink() + staker.beneficiary}
                                    className={styles.link}
                                >
                                    {Data.formatString(staker.beneficiary)}
                                    <ShareLink/>
                                </Link>
                                <Tooltip title="Copied">
                                    <Copy
                                        style={{ cursor: "pointer" }}
                                        onClick={(e) => copyToClipBoard(staker.beneficiary)}
                                    />
                                </Tooltip>
                            </td>
                        </tr>
                        <tr>
                            <th>Authorizer</th>
                            <td>
                                <Link
                                    target="_blank"
                                    underline="hover"
                                    href={Utils.getEtherAddressLink() + staker.authorizer}
                                    className={styles.link}
                                >
                                    {Data.formatString(staker.authorizer)}
                                    <ShareLink/>
                                </Link>
                                <Tooltip title="Copied">
                                    <Copy
                                        style={{ cursor: "pointer" }}
                                        onClick={(e) => copyToClipBoard(staker.authorizer)}
                                    />
                                </Tooltip>
                            </td>
                        </tr>
                        <tr>
                            <th>Operator</th>
                            <td>
                                <Link
                                    target="_blank"
                                    underline="hover"
                                    href={Utils.getEtherAddressLink() + staker.registeredOperatorAddress}
                                    className={styles.link}
                                >
                                    {staker.registeredOperatorAddress ? Data.formatString(staker.registeredOperatorAddress) : "Operator not registered"}
                                    <ShareLink/>
                                </Link>
                                <Tooltip title="Copied">
                                    <Copy
                                        style={{ cursor: "pointer" }}
                                        onClick={(e) => copyToClipBoard(staker.registeredOperatorAddress)}
                                    />
                                </Tooltip>
                            </td>
                        </tr>
                        <tr>
                            <th>Operator confirmed</th>
                            <td>
                                {
                                    staker.isOperatorConfirmed ? (
                                        <CheckSharpIcon style={{color: "green"}}/>
                                    ) : (
                                        <CloseSharpIcon style={{color: "red"}}/>
                                    )
                                }
                            </td>
                        </tr>
                    </tbody>

                    {/* --------- Authorizations---------*/}
                    <tbody>
                        <tr>
                            <th colSpan="2" style={{fontWeight: "bold"}}>Authorizations</th>
                        </tr>
                    </tbody>
                    <tbody className={styles.staker_detail_overview_table_tbody}>
                        <tr>
                            <th>Total authorized</th>
                            <td>
                                {
                                    staker.weiDecimalAuthorizedAmount
                                }
                                {
                                    staker.isAuthorized ? (
                                        <CheckSharpIcon style={{color: "green"}}/>
                                    ) : (
                                        <CloseSharpIcon style={{color: "red"}}/>
                                    )
                                }

                            </td>
                        </tr>
                    </tbody>
                    {/* --------- Deauthorization ---------*/}
                    <tbody>
                    <tr>
                        <th colSpan="2" style={{fontWeight: "bold"}}>Deauthorization</th>
                    </tr>
                    </tbody>
                    <tbody className={styles.staker_detail_overview_table_tbody}>
                        <tr>
                            <th>Total deauthorizing</th>
                            <td>
                                {staker.weiDecimalDeauthorizingAmount}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style={{flex: "1 1 0%"}}>
                <h4><strong>Log</strong></h4>
                {staker?.events?.map(eventEntity => {
                    const event = eventEntity.eventType;
                    const timestamp = eventEntity.timestamp;
                    const amount = eventEntity.weiDecimalEventAmount;
                    return (
                        <div className={styles.log_item}>
                            <div className={styles.log_item_lable}>
                                <Tooltip title={Data.formatDate(timestamp)}>
                                    <span>{Data.formatTimeToText(timestamp)}</span>
                                </Tooltip>
                            </div>
                            <div>
                                <strong>{formatEventType(event)}</strong>
                                <div>
                                    {formatEvent(event, amount)}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

function DKGRituals(staker) {
    const [pageData, setPageData] = useState({
        rowData: [],
        isLoading: false,
        pageNumber: 1
    });

    useEffect(() => {
        setPageData((prevState) => ({
            ...prevState,
            rowData: [],
            isLoading: true,
        }));

        Data.getRitualsByStakingProvider(staker).then((info) => {
            if(info?.rituals === undefined){
                setPageData({
                    isLoading: false,
                    rowData: []
                });
            } else {
                setPageData({
                    isLoading: false,
                    rowData: Data.formatRitualsData(info.rituals)
                });
            }
        });
    }, []);

    return <RitualTable
        columns={Data.ritual_columns}
        data={pageData.rowData}
        isLoading={pageData.isLoading}
        network
    />
    
}

const StakerDetailPage = () => {
    const [pageData, setPageData] = useState({
        rowData: {},
        isLoading: true,
    });

    const [staker, setStaker] = useState();
    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const staker = query.get("staker");
        setStaker(staker);

        Data.getStakerDetail(staker).then((info) => {
            if (info == null || info == undefined) {
                setPageData({
                    isLoading: false,
                    rowData: {}
                });
                return
            }

            setPageData({
                isLoading: false,
                rowData: Data.formatStakerDetail(info)
              });
        });
    }, []);

    function calculatePercentAuthorizedOfStake(authorizedAmount, stakedAmount) {
        if (stakedAmount == 0 || authorizedAmount == 0)
            return 0
        return parseFloat((authorizedAmount / stakedAmount) * 100).toFixed(2);
    }

    return (<>
            {
                pageData.isLoading ? (
                    <div style={{textAlign: "center"}}>
                        <Loader/>
                    </div>
                ) : (
                    <div>
                        <div className={styles.staker_detail_header}>
                            <div className={styles.staker_detail_header_address}>
                                <h3><Link
                                    target="_blank"
                                    underline="hover"
                                    href={Utils.getEtherAddressLink() + staker}
                                    className={styles.link}
                                >
                                    {Data.formatString(staker)}
                                    <ShareLink/>
                                </Link>
                                </h3>
                                <span>Staking Provider</span>
                            </div>
                            <div className={styles.staker_detail_header_value}>
                                <div className={styles.staker_detail_header_value_item}>
                                    <div className={styles.staker_detail_header_value_item_lable}>total authorized
                                    </div>
                                    <div>
                                        <div>{pageData.rowData.weiDecimalAuthorizedAmount}<span
                                            className={styles.span_t_token}>{" T"}</span></div>
                                        <div
                                            className={styles.staker_detail_header_value_item_percent}>
                                            {calculatePercentAuthorizedOfStake(pageData.rowData.parsedAuthorizedAmount, pageData.rowData.parsedStakedAmount)}%
                                            of staked
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.staker_detail_header_value_item}>
                                    <div className={styles.staker_detail_header_value_item_lable}>staked</div>
                                    <div>
                                        <div>{pageData.rowData.weiDecimalStakedAmount}<span
                                            className={styles.span_t_token}>{" T"}</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <StakerDetail staker={pageData.rowData} stakingProvider={staker} />
                    </div>
                )
            }</>

    );
}

export default StakerDetailPage;