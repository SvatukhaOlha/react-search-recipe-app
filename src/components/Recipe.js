import React from 'react';
import '../App.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PublicIcon from '@material-ui/icons/Public';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import '@fontsource/roboto';
import { Typography, Card, CardContent, 
    IconButton, Collapse, CardMedia, CardActions, Button, Icon,
    Link, Chip } from '@material-ui/core';

export default function Recipe({title, image, category,
     contry, ingredients, tags, instructions, link, 
     }) {

        // STYLES
const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 900,
      marginBottom: 20,
    },
    media: {
      paddingTop: '56.25%',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    marginTop: {
        marginTop: 20,
        color: 'rgb(118, 118, 118)', 
    },
    button: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 20,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
        margin: 5,
        cursor: "default",
    },
    flexCenter: {
        display: 'flex',
        justifyContent: 'center',
        padding: 0,
    },
    bold: {
        fontWeight: 700,
        fontSize: 20,
    },
    padding0: {
        paddingTop: 0,
        paddingBottom: 0,
    },
    chip: {
        background: 'white',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: '#FE6B8B',
        borderColor: '0 5px 7px 5px rgba(255, 105, 135, .3)',
        border: 1,
        marginRight: 10,
        borderRadius: 20,
        height: 28,
        padding: '0 10px',
       
    }

  }));

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


    return (
        <>
<Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={image}
        title={title}
      />
      <Typography  
        align='center'
        variant="h4"
        className={classes.marginTop}
        gutterBottom>
                {title}
        </Typography>
       <CardContent className={classes.flexCenter}>
       <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<Icon><PublicIcon /></Icon>}
        
      >
        {contry}
      </Button>
      <Button
        variant="contained"
        className={classes.button}
        endIcon={<Icon><FastfoodIcon /></Icon>}
      >
        {category}
      </Button>
       </CardContent>
       <div className='center'>
       {
          tags && (
            tags.map((el) =><Chip 
            label={el}
            className={classes.chip} />)
          )
      }
      </div>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, classes.padding0, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent className={classes.padding0}>
        {<ol>
            {ingredients && ingredients.map(el => (
                <li>{el}</li>
            ))}
        </ol>}
      </CardContent>
        <CardContent>
          <Typography align='center'
           variant="h5" gutterBottom>How to cook:</Typography>
          <Typography paragraph>
          {instructions}
          </Typography>
          <Link className={classes.bold} href={link}>Visit site</Link>
        </CardContent>
      </Collapse>
    </Card>
    </>
    )
    
}