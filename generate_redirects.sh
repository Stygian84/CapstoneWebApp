#!/bin/bash

# Create or overwrite the _redirects file with the desired redirection rules
echo "REACT_APP_AWS_URL $REACT_APP_AWS_URL" >> _redirects
echo "REACT_APP_AWS_ROW_URL $REACT_APP_AWS_ROW_URL/api/row" >> _redirects
echo "REACT_APP_AWS_STATUS_URL $REACT_APP_AWS_STATUS_URL/api/status/" >> _redirects
