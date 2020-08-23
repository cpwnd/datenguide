import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import DropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import CardActions from '@material-ui/core/CardActions'

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    fontSize: '16px',
    marginBottom: theme.spacing(1),
  },
  header: {
    paddingBottom: 0,
    '@global': {
      '.MuiCardHeader-title': {
        fontWeight: 'normal',
      },
      '.MuiCardHeader-subheader': {
        fontSize: '14px',
      },
    },
  },
  summary: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: theme.spacing(0, 1, 2, 2),
  },
  chip: {
    color: 'white',
    display: 'inline-block',
    width: 80,
    background: theme.palette.grey[600],
    fontWeight: 'bold',
    fontSize: theme.typography.button.fontSize,
    textAlign: 'center',
    border: 0,
    padding: theme.spacing(0.5, 1.5),
    borderRadius: 20,
    marginRight: theme.spacing(1),

    '&.hasIcon': {
      width: 'auto',
    },
  },
  icon: {
    verticalAlign: 'text-bottom',
    fontSize: '1.25em',
    margin: theme.spacing(0, 0.5, 0, -1),
  },
  headingAttribute: {
    fontSize: theme.typography.h4.fontSize,
  },
  headingSubtitle: {},
  regionLevel: {
    fontSize: '16px',
    color: theme.palette.grey[600],
  },
  menuButton: {
    margin: 0,
    padding: theme.spacing(1, 0, 0),
    border: 0,
    background: 'transparent',
    cursor: 'pointer',
  },
  helptext: {
    paddingTop: theme.spacing(2),
    fontSize: '14px',
    color: theme.palette.grey[600],
  },
}))

const childLevels = [
  {
    id: 2,
    abbr: 'NUTS 2',
    title: 'Alle Regierungsbezirke/statistische Regionen',
  },
  {
    id: 3,
    abbr: 'NUTS 3',
    title: 'Alle Landkreise/kreisfreie Städte',
  },
  {
    id: 4,
    abbr: 'LAU',
    title: 'Alle Gemeinden',
  },
]

const parentLevels = [
  {
    id: 1,
    abbr: 'NUTS 1',
    title: 'Bundesland',
  },
  {
    id: 2,
    abbr: 'NUTS 2',
    title: 'Regierungsbezirk/statistische Region',
  },
  {
    id: 3,
    abbr: 'NUTS 3',
    title: 'Landkreis/kreisfreie Stadt',
  },
  {
    id: 4,
    abbr: 'LAU',
    title: 'Gemeinde',
  },
]

const RegionSearchParameterCard = ({
  region,
  level,
  onClose,
  onRegionLevelChange,
}) => {
  const classes = useStyles()
  const [menuAnchor, setMenuAnchor] = useState(null)

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget)
  }

  const handleMenuClose = () => {
    setMenuAnchor(null)
  }

  const handleMenuSelect = (level) => {
    setMenuAnchor(null)
    onRegionLevelChange(level)
  }

  const renderRegionLevel = ({ nuts, showIcon = true, parent = true }) => {
    console.log('nuts', nuts)
    console.log('parentLevels', parentLevels)
    console.log('childLevels', childLevels)
    console.log('parent', parent)

    const { abbr, title } = parent
      ? parentLevels.find(({ id }) => nuts === id)
      : childLevels.find(({ id }) => nuts === id)
    return (
      <div className={classes.regionLevel}>
        <span className={clsx(classes.chip, { hasIcon: showIcon })}>
          {showIcon && <DropDownCircleIcon className={classes.icon} />}
          {abbr}
        </span>
        {title}
      </div>
    )
  }

  const renderMenu = () => {
    return (
      <>
        <button onClick={handleMenuOpen} className={classes.menuButton}>
          {region.nuts &&
            renderRegionLevel({ nuts: level, parent: level === region.nuts })}
        </button>
        <Menu
          id="region-menu"
          anchorEl={menuAnchor}
          keepMounted
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
        >
          {[parentLevels.find((l) => l.id === region.nuts)].map(({ id }) => {
            return (
              <MenuItem
                key={id}
                className={classes.menuItem}
                onClick={() => handleMenuSelect(id)}
              >
                {renderRegionLevel({ nuts: id, showIcon: false, parent: true })}
              </MenuItem>
            )
          })}
          {childLevels
            .filter((l) => l.id > region.nuts)
            .map(({ id }) => {
              return (
                <MenuItem
                  key={id}
                  className={classes.menuItem}
                  onClick={() => handleMenuSelect(id)}
                >
                  {renderRegionLevel({
                    nuts: id,
                    showIcon: false,
                    parent: false,
                  })}
                </MenuItem>
              )
            })}
        </Menu>
      </>
    )
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        title={<div className={classes.headingAttribute}>{region.name}</div>}
        action={
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        }
        className={classes.header}
        subheader={parentLevels.find((l) => l.id === region.nuts).title}
      />
      <CardActions disableSpacing className={classes.actions}>
        <div className={classes.helptext}>
          Wähle hier die regionale Tiefe aus:
        </div>
        {renderMenu()}
      </CardActions>
    </Card>
  )
}

RegionSearchParameterCard.propTypes = {
  onClose: PropTypes.func.isRequired,
  onRegionLevelChange: PropTypes.func.isRequired,
  region: PropTypes.object.isRequired,
}

export default RegionSearchParameterCard
