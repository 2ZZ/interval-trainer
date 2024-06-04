import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import FileUpload from "@mui/icons-material/FileUpload";

import { createLogger } from "./utils";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary,
    color: theme.palette.common.primary,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function History(props) {
  const { debug } = props;
  const log = createLogger(debug);

  let rows = JSON.parse(localStorage.getItem("workoutHistory") || "[]");

  function deleteHistoryItem(index) {
    const statsStr = localStorage.getItem("workoutHistory");
    let stats = JSON.parse(statsStr);
    let newStats = [];
    for (var count = 0; count < stats.length; count++) {
      if (count !== index) {
        newStats.push(stats[count]);
      }
    }
    localStorage.setItem("workoutHistory", JSON.stringify(newStats));
    props.setHistoryUpdated(!props.historyUpdated);
  }

  function getFileSafeTimestamp() {
    const date = new Date();
    const timestamp =
      date.getFullYear().toString() + // getting year
      (date.getMonth() + 1).toString().padStart(2, "0") +
      date.getDate().toString().padStart(2, "0") +
      date.getHours().toString().padStart(2, "0") +
      date.getMinutes().toString().padStart(2, "0") +
      date.getSeconds().toString().padStart(2, "0");
    return timestamp;
  }

  function downloadHistory() {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," +
        encodeURIComponent(
          localStorage.getItem("workoutHistory" || []),
          null,
          2
        )
    );
    element.setAttribute(
      "download",
      `routine-history-${getFileSafeTimestamp()}.json`
    );
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  const hiddenFileInput = React.useRef(null);
  const handleUploadClick = () => {
    hiddenFileInput.current.click();
  };

  const uploadHistory = (event) => {
    const fileUploaded = event.target.files[0];
    if (fileUploaded && fileUploaded.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target.result);
          localStorage.setItem("workoutHistory", JSON.stringify(json));
        } catch (error) {
          console.error("Error parsing JSON", error);
        }
      };
      reader.readAsText(fileUploaded);
    } else {
      log("Please upload a JSON file.");
    }
  };

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    rows = JSON.parse(localStorage.getItem("workoutHistory"));
    props.setHistoryUpdated(!props.historyUpdated);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.historyUpdated]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <b>Date</b>
              </StyledTableCell>
              <StyledTableCell align="right">
                <b>Routine</b>
              </StyledTableCell>
              <StyledTableCell align="right">
                <b>Mode</b>
              </StyledTableCell>
              <StyledTableCell align="right">
                <b>Total time</b>
              </StyledTableCell>
              <StyledTableCell align="right">
                <b>Weight</b>
              </StyledTableCell>
              <StyledTableCell align="right">
                <b>Action</b>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.Date}
                </StyledTableCell>
                <StyledTableCell align="right">{row.Routine}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.Mode || "Unknown"}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row["Total time"]}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.History
                    ? row.History.reduce(
                        (acc, curr) => acc + parseInt(curr.weight, 10),
                        0
                      )
                    : "?"}
                  KG
                </StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton onClick={() => deleteHistoryItem(index)}>
                    <DeleteIcon color="action" />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ textAlign: "right" }}>
        <IconButton onClick={() => downloadHistory()}>
          <SaveAltIcon color="action" />
        </IconButton>
        <IconButton onClick={handleUploadClick}>
          <FileUpload color="action" />
        </IconButton>
        <input
          type="file"
          ref={hiddenFileInput}
          onChange={uploadHistory}
          style={{ display: "none" }}
          accept="application/json"
        />
      </div>
    </div>
  );
}
