import './App.css';
import {
  MenuItem,
  FormControl,
  Select
} from '@material-ui/core'
import './App.css'

function App() {
  return (
    <div className="app">
      <h1>Covid 19 Tracker</h1>
      <FormControl className="app__dropdown">
        <Select
          varient="outlined"
          value="abc"
        >
          <MenuItem value="worldwide">Worldwide</MenuItem>
          <MenuItem value="worldwide">Worldwide</MenuItem>
          <MenuItem value="worldwide">Worldwide</MenuItem>
          <MenuItem value="worldwide">Worldwide</MenuItem>

        </Select>
      </FormControl>
      {/* Header */}
      {/* Title + Select input dropdown field */}

      {/* Info Boxes */}
      {/* Info Boxes */}

      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;
