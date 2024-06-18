import React, { useState, useEffect } from "react";
import * as Data from "../data";
import StakersTable from "../../components/table/staker";
import styles from "./styles.module.css";

const StakersPage = ({ network, isSearch, searchInput }) => {
  const [pageData, setPageData] = useState({
    rowData: [],
    isLoading: false,
    pageNumber: 1
  });

  const [stats, setStats] = useState({
    numBondedOperators: "loading...",
    totalAuthorizedAmount: 0,
    totalStaked: 0,
  });

  useEffect(() => {
    setPageData((prevState) => ({
      ...prevState,
      rowData: [],
      isLoading: true,
    }));

    Data.getStakers(isSearch, searchInput).then((info) => {
      const {stakers, statsRecord} = Data.formatStakers(info?.appAuthorizations);
      const totalStakers = stakers.length;

      setPageData({
        isLoading: false,
        rowData: stakers,
        totalStakers: totalStakers,
      });

      if (!isSearch) {
        setStats(statsRecord);
      }
    });
  }, [isSearch]);

  return (
    <div>
      <div className={styles.staker_detail_header}>
        <div className={styles.staker_detail_header_address}>
          {isSearch ? (
            <>
              <h4>Search : {searchInput}</h4>
              <span>{pageData.totalStakers} staker</span>
            </>
          ) : (
            <>
              <h3>Stakers</h3>
              <span>{pageData.totalStakers} stakers</span>
            </>
          )}
        </div>
        <div className={styles.staker_detail_header_value}>
          <div className={styles.staker_detail_header_value_item}>
            <div className={styles.staker_detail_header_value_item_lable}>
              Confirmed Operators
            </div>
            <div>
              <div>{stats?.numBondedOperators}</div>
            </div>
          </div>
        </div>
        <div className={styles.staker_detail_header_value}>
          <div className={styles.staker_detail_header_value_item}>
            <div className={styles.staker_detail_header_value_item_lable_sub}>
              Total Authorized
            </div>
            <div>
              <div>
                {Data.formatWeiDecimalNoSurplus(
                  stats?.totalAuthorizedAmount
                )}
                <span className={styles.span_t_token}>{" T"}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.staker_detail_header_value}>
          <div className={styles.staker_detail_header_value_item}>
            <div className={styles.staker_detail_header_value_item_lable_sub}>
              Total Staked
            </div>
            <div>
              <div>
                {Data.formatWeiDecimalNoSurplus(
                  stats?.totalStaked
                )}
                <span className={styles.span_t_token}>{" T"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.table_content}>
        <StakersTable
          columns={Data.staker_columns}
          data={pageData.rowData}
          isLoading={pageData.isLoading}
          network={network}
        />
      </div>
    </div>
  );
};

export default StakersPage;
