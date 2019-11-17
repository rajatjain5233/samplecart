import React,{Component} from 'react';
import './App.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';




const styles = theme => ({ 
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  card: {
    minWidth: 308,
    minHeight: 140
  },
  title: {
    flexGrow: 1,
    color:"white"
  },
  secondheading:{
    minHeight: 60,
    marginTop: 20,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  }
});


class App extends Component {
  state={
    foodsMapData:[],
    foodsMapDataOriginal:[]
  }

  componentDidMount=()=>{
    this.getFoods();

  }
  getFoodsData=(foodsData)=>{
    const { classes } = this.props;
    return(
      <Grid item>  
        <Card className={classes.card}>
          <CardContent>
            <Typography component="p">
              {"name"}
            </Typography>

          </CardContent>
          <CardActions>
            <Button size="small">

            </Button>
          </CardActions>
        </Card>
      </Grid>
      
    )
  }
  sortHighLow=()=>{
    var newfoodsMapData=this.state.foodsMapData.sort((a,b) => (a.price < b.price) ? 1 : ((b.price < a.price) ? -1 : 0)); 
    this.setState({foodsMapData:newfoodsMapData})

        
  }
  sortLowHigh=()=>{
    var newfoodsMapData=this.state.foodsMapData.sort((a,b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0)); 
    this.setState({foodsMapData:newfoodsMapData})

  }


  getFoods=()=>{
    fetch("https://s3-ap-southeast-1.amazonaws.com/he-public-data/smartQFood8bef5a2.json")
    .then(response => response.json())
    .then((response)=>{

          // let foodsData=response;
          let foodsMapData=response;
          this.setState({foodsMapData:foodsMapData,foodsMapDataOriginal:foodsMapData})
    }).catch();
  }
  onsearchRestaurant=(event)=>{
    console.log(event)
    let searchvalue=event.target.value;
    var foodsMapData=[];
    if(searchvalue!=""){
      for(var i=0;i<this.state.foodsMapData.length;i++){

        if(this.state.foodsMapData[i].itemname.includes(searchvalue)){
          foodsMapData.push(this.state.foodsMapData[i]);
        }

      }
      this.setState({foodsMapData:foodsMapData});

    }else{
      this.setState({foodsMapData:this.state.foodsMapDataOriginal});
    }
    
    


  }

  render(){
    // debugger
    const { classes } = this.props;
    // let classes = useStyles();
    var Now=new Date();
    var hour= Now.getHours();
    var minutes=Now.getMinutes();
    return (
      <div>
        <AppBar style={{"background":"#FFB233"}} position="static">
          <Toolbar>
            
            <Typography variant="h6" className={classes.title}>
              SmartQ
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onChange={(event,value)=>this.onsearchRestaurant(event,value)}
              />
            </div>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <div>
          <Grid container spacing={16}>
            <Grid item xs={2}>
                <Grid container  justify="center" spacing={2}>
                  
                    <Grid item>
                      <Paper className={classes.paper} />
                      
                    </Grid>
                  
                </Grid>
            </Grid>
            <Grid item xs={8}>
                <div className={classes.secondheading}>
                   <Typography component="h5" variant="h5">
                    {"Lunch"}
                  </Typography>
                </div>
                <div className={classes.secondheading}>
                    <Grid container  spacing={2}>
                        <Grid xs={7}>
                          <Typography component="p" variant="p">
                            {}
                          </Typography>
                        </Grid>
                        <Grid xs={1}>
                          <Typography component="p" variant="p">
                            {"Sort by"}
                          </Typography>
                        </Grid>
                        <Grid xs={2}>
                          
                          <Button onClick={this.sortLowHigh} variant="outlined" color="#FFB233" size="small">
                              Price-Low to High
                          </Button>
                        </Grid> 
                        <Grid xs={2}>
                          
                          <Button onClick={this.sortHighLow} variant="outlined" color="#FFB233" size="small">
                              Price-High to Low
                          </Button>
                        </Grid>  
                    </Grid>
                </div>
                <Grid container  spacing={2}>
                  {
                    this.state.foodsMapData.map((row,key)=>{
                          debugger

                          let CurrentlyActive=false;
                          let CurrentlyAvailable = row.availabletime.split(",");
                          let range=CurrentlyAvailable[0].split("-");
                          debugger
                          let rangehourMin=range[0].split(":");
                          let rangehourMin1=range[1].split(":");
                          


                          let range1=CurrentlyAvailable[1].split("-");
                          // let range1hourMin=range.split(":");

                          let range1hourMin=range1[0].split(":");
                          let range1hourMin1=range1[1].split(":");
 

                          if((hour>=rangehourMin[0]&&minutes>=rangehourMin[1])&&
                             (hour<=rangehourMin1[0])){
                             if(hour==rangehourMin1[0]&&minutes>rangehourMin1[1]){

                                  CurrentlyActive=false;

                             }
                             CurrentlyActive=true;
                             
                          }
                          if((hour>=range1hourMin1[0]&&minutes>=range1hourMin1[1])&&
                             (hour<=range1hourMin1[0]&&minutes<=range1hourMin1[1])){
                            if(hour==range1hourMin1[0]&&minutes>range1hourMin1[1]){

                                  CurrentlyActive=false;

                            }
                             CurrentlyActive=true;
                          }
                          

                          
                          
                          return(
                            <Grid item>  
                            <Card className={classes.card}>
                              <CardContent>
                                <Grid
                                  container
                                  direction="row" 
                                > 
                                  <Grid xs={6}>
                                    <Typography component="h5" variant="h5">
                                      {                                      row.itemname[0].toUpperCase() + row.itemname.slice(1)}
                                    </Typography>
                                  </Grid>  
                                  <Grid xs={6}>
                                    <Typography style={{float: "right"}} component="h5" variant="h5">
                                      {"Rs."+row.price}
                                    </Typography>
                                  </Grid>    

                                </Grid>
                                
                              </CardContent>
                              
                              <CardActions style={{"float": "right","marginTop": 25}}>
                                
                                {
                                  CurrentlyActive?(
                                      <Button  variant="outlined" color="#FFB233" size="small">
                                           Add
                                      </Button>
                                      ):(<Button  variant="outlined" color="#FFB233" size="small">
                                          Currently unavailable
                                      </Button>
                                      )
                                }
                              </CardActions>
                            </Card>
                          </Grid>
                          )
                        }
                      
                      
                    )
                  }
                      

                     
                    
                    
                   

                  
                </Grid>
            </Grid>
            <Grid item xs={2}>
                <Grid container  justify="center" spacing={2}>
                  
                    <Grid item>
                      <Paper className={classes.paper} />
                      
                    </Grid>
                  
                </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
  
}

// export default App;
export default withStyles(styles)(App);

