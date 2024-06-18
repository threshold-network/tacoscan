export function getColorByStatus(status) {
  if (
    status === "DKG AWAITING TRANSCRIPTS" ||
    status === "Start Ritual"
  ) {
    return "#3498db";
  } else if (status === "DKG AWAITING AGGREGATIONS" || status === "Posted Transcripts") {
    return "#f1c40f";
  } else if (
    status === "SUCCESSFUL" || status === "Posted Aggregations"
  ) {
    return "#2ecc71";
  } else if (
    status === "UNSUCCESSFUL" 
  ) {
    return "#f10f0f";
  } else {
    return "#95a5a6";
  }
}
