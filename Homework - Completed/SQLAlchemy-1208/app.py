import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect

import psutil, os
p = psutil.Process( os.getpid() )
for dll in p.memory_maps():
  print(dll.path)



from flask import Flask, jsonify

import numpy as np
import pandas as pd
import datetime as dt
#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///Resources/hawaii.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Measurement = Base.classes.measurement
Station = Base.classes.station

session = Session(engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/precipitation<br/>"
        f"/api/v1.0/stations"
    )


@app.route("/api/v1.0/precipitation")
def precipitation():
    # Calculate the date 1 year ago from the last data point in the database
    lastdate = session.query(Measurement.date).order_by(Measurement.date.desc()).first()
    lastdate = dt.datetime.strptime(str(lastdate[0]), '%Y-%m-%d')

    # Perform a query to retrieve the data and precipitation scores
    yearago =  lastdate - dt.timedelta(days=365)

    results = session.query(Measurement.date, Measurement.prcp)\
        .filter(Measurement.date>=yearago).\
        order_by(Measurement.date.asc()).all()

    return jsonify({k:v for k,v in results})

@app.route("/api/v1.0/stations")
def stations():
    ''' do code'''

# @app.route("/api/v1.0/<start>")
# def stats():
# @app.route("/api/v1.0/<start>/<end>")
# def names():


if __name__ == '__main__':
    app.run(debug=True)
