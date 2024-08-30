"use client";
import styles from "./styles.module.css";
import {
  Box,
  Card,
  CardContent,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import CodeMirror from "@uiw/react-codemirror";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const methods = ["GET", "POST", "PUT", "DELETE"];

export const RestClientPage = () => {
  return (
    <main className={styles["rest-client-container"]}>
      <section>
        <h2> REST Client</h2>
        <Card sx={{ minHeight: "550px" }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <FormControl style={{ width: "120px" }}>
                <InputLabel>Method</InputLabel>
                <Select sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  {methods.map((method) => {
                    return (
                      <MenuItem key={method} value={method}>
                        {method}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <TextField fullWidth label="Endpoint URL" />
            </Box>

            <h3>Headers:</h3>
            <Box mb={1} display="flex" alignItems="center">
              <TextField label="Header Key" style={{ marginRight: "8px" }} />
              <TextField label="Header Value" style={{ marginRight: "8px" }} />
              <IconButton>
                <RemoveIcon className={styles.icon} />
              </IconButton>
              <IconButton>
                <AddIcon className={styles.icon} />
              </IconButton>
            </Box>

            <h3>Body:</h3>
            <Paper elevation={1}>
              <CodeMirror
                minHeight="200px"
                maxWidth="500px"
                style={{ fontSize: "16px", textAlign: "left" }}
              />
            </Paper>

            <button className={styles["send-btn"]}>Send Request</button>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2>Response</h2>
        <Card sx={{ minHeight: "550px", minWidth: "400px" }}>
          <CardContent>
            <div>Status: </div>

            <Paper elevation={1}>
              <CodeMirror
                minHeight="450px"
                editable={false}
                value={"response"}
                style={{ textAlign: "left" }}
              />
            </Paper>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};
