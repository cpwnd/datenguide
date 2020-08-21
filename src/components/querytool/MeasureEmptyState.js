import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AutocompleteSearchField from './AutocompleteSearchField'

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    // height: '108px',
    border: '1px dotted',
    background: theme.palette.common.white,
    padding: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  title: {
    fontSize: '24px',
    fontWeight: '400',
  },
  subtitle: {
    fontSize: '14px',
    fontWeight: '400',
    color: theme.palette.grey[600],
    marginBottom: theme.spacing(1),
  },
}))

const loadMeasureOptions = async (value = '') => {
  // TODO use server API
  const result = await fetch(`/api/search/measures?filter=${value}`)
  const json = await result.json()
  return json.map((statistic) => {
    const split = statistic.label.split('-').map((s) => s.trim()) // TODO fetch data in proper format to avoid this
    return {
      value: statistic.value,
      label: split[1],
      description: split[0],
    }
  })
}

const MeasureEmptyState = ({ dispatch, actions }) => {
  const classes = useStyles()

  const handleSelectionChange = (measure) => {
    dispatch(actions.loadMeasure(measure.value))
  }

  return (
    <div className={classes.root}>
      <div className={classes.title}>2. Wähle eine Wertmerkmal aus.</div>
      <div className={classes.subtitle}>
        Suche ein Wertmerkmal hier im Suchfeld oder nutze die Baumansicht, um
        das gewünschte Wertmerkmal zu finden.
      </div>
      <AutocompleteSearchField
        loadOptions={loadMeasureOptions}
        onSelectionChange={handleSelectionChange}
        placeholder="Merkmal suchen oder auswählen"
      />
    </div>
  )
}

export default MeasureEmptyState
