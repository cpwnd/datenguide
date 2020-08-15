import Toolbar from '@material-ui/core/Toolbar'
import TextFormatIcon from '@material-ui/icons/TextFormat'
import SaveAltIcon from '@material-ui/icons/SaveAlt'
import AppsIcon from '@material-ui/icons/Apps'
import DateRangeIcon from '@material-ui/icons/DateRange'
import { makeStyles } from '@material-ui/styles'

import DataTableRadioButtonMenu from './DataTableRadioButtonMenu'
import DataTableDownloadMenu from './DataTableDownloadMenu'
import DataTableCheckboxMenu from './DataTableCheckboxMenu'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))

const DataTableToolbar = ({ labels, layout, dispatch, actions, queryArgs }) => {
  const classes = useStyles()

  const labelOptions = [
    { label: 'Texte', value: 'name' },
    { label: 'Codes', value: 'id' },
    { label: 'Codes und Texte', value: 'both' },
  ]

  const handleLabelsChange = (value) => {
    dispatch(actions.changeLabels({ labels: value.target.value }))
  }

  const layoutOptions = [
    { label: 'Eine Zeile pro Wert', value: 'long' },
    { label: 'Eine Zeile pro Region', value: 'region' },
    { label: 'Eine Zeile pro Jahr', value: 'time' },
  ]

  const handleLayoutChange = (value) => {
    dispatch(actions.changeLayout({ layout: value.target.value }))
  }

  const yearOptions = [
    { label: '2018', value: 2018 },
    { label: '2019', value: 2019 },
    { label: '2020', value: 2020 },
  ]

  const handleYearChange = (value) => {}

  return (
    <Toolbar variant="dense" className={classes.root}>
      <DataTableRadioButtonMenu
        label="Layout"
        icon={<AppsIcon />}
        options={layoutOptions}
        value={layout}
        onChange={handleLayoutChange}
      />
      <DataTableCheckboxMenu
        label="Jahre"
        icon={<DateRangeIcon />}
        options={yearOptions}
        value={layout}
        onChange={handleYearChange}
      />
      <DataTableRadioButtonMenu
        label="Beschriftung"
        icon={<TextFormatIcon />}
        options={labelOptions}
        value={labels}
        onChange={handleLabelsChange}
      />
      <DataTableDownloadMenu
        label="Download"
        icon={<SaveAltIcon />}
        queryArgs={queryArgs}
      />
    </Toolbar>
  )
}

export default DataTableToolbar