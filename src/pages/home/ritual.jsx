import React, {useState, useEffect} from "react";
import * as Data from "../data";
import RitualTable from "../../components/table/ritual";
import styles from './styles.module.css'

const RitualPage = ({network, isSearch, searchInput}) => {
    const [pageData, setPageData] = useState({
        rowData: [],
        isLoading: false,
        pageNumber: 1,
        ritualCounter: {}
    });

    useEffect(() => {
        setPageData((prevState) => ({
            ...prevState,
            rowData: [],
            ritualCounter: {},
            isLoading: true,
        }));

        Data.getRituals(isSearch, searchInput).then((info) => {
            if(info?.rituals === undefined){
                setPageData({
                    isLoading: false,
                    rowData: [],
                    ritualCounter: {},
                });
            } else {
                setPageData({
                    isLoading: false,
                    rowData: Data.formatRitualsData(info.rituals),
                    ritualCounter: info?.ritualCounter
                });
            }

        });

    }, [network, isSearch]);


    return (
        <div>
            <div className={styles.staker_detail_header}>
                <div className={styles.staker_detail_header_address}>
                    {
                        isSearch ? (
                            <h4>Search : {searchInput}</h4>
                        ) : (
                            <>
                            <h3>DKG Rituals</h3>
                            <span>{pageData.ritualCounter.total} rituals</span>
                            </>
                        )
                    }                    
                </div>
                <div className={styles.staker_detail_header_value}>
                    <div className={styles.staker_detail_header_value_item}>
                        <div className={styles.staker_detail_header_value_item_lable}>total DKG rituals
                        </div>
                        <div>
                            <div>{pageData.ritualCounter === undefined ? "loading..." : pageData.ritualCounter?.total}</div>
                        </div>
                    </div>
                    <div className={styles.staker_detail_header_value_item}>
                        <div className={styles.staker_detail_header_value_item_lable}>ended DKG rituals
                        </div>
                        <div>
                            <div>{pageData.ritualCounter === undefined ? "loading..." : pageData.ritualCounter?.successful}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.table_content}>
                <RitualTable
                    columns={Data.ritual_columns}
                    data={pageData.rowData}
                    isLoading={pageData.isLoading}
                    network={network}
                />
            </div>
        </div>
    );
}

export default RitualPage;