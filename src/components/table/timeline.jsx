import React, {useMemo} from "react";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import Link from "@mui/material/Link";
import {ReactComponent as ShareLink} from "../../assets/link.svg";
import styles from "./styles.module.css";
import {getPolygonScanTxHashLink, getPolygonScanAddressLink} from "../../utils/utils"
import * as Data from "../../pages/data";
import {getColorByStatus} from "./view_utils"
import Tooltip from "@mui/material/Tooltip";

export default function TransactionTimeline(transactions, network) {
  const rowData = useMemo(() => transactions, [transactions]);
  const transactionLength = rowData.transactions.length;
  return (<React.Fragment>
    <Timeline>
      {rowData.transactions.map((transaction, index) => (
        <TimelineItem>
          <TimelineOppositeContent color="text.secondary">
            <Tooltip title={Data.formatDate(transaction.timestamp * 1000)}>
              <span>{Data.calculateTimeMoment(transaction.timestamp * 1000)}</span>
            </Tooltip>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot sx={{backgroundColor:getColorByStatus(transaction.description)}}/>
            {index != transactionLength - 1 ? <TimelineConnector/> : ""}
          </TimelineSeparator>
          <TimelineContent>
            {transaction.txHash 
              ? <Link
                  target="_blank"
                  underline="hover"
                  href={getPolygonScanTxHashLink() + transaction.txHash}
                  className={styles.link}
                >
                  {transaction.description}
                  <ShareLink/>
                </Link>
              : <span className={styles.descriptionSpan}>
                {transaction.description}
              </span>
            }
            {transaction.from &&
              <>
                <span className={styles.bySpan}>by</span>
                <Link
                  target="_blank"
                  underline="hover"
                  href={getPolygonScanAddressLink() + transaction.from}
                  className={styles.by_link}
                >
                  {Data.formatString(transaction.from)}
                  <ShareLink/>
                </Link>
              </>
            }
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  </React.Fragment>);
}
