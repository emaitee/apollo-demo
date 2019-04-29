import React from 'react';
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import { fontSize, colors } from './styles'
import numeral from 'numeral'

// const ExchangeRateQuery = gql

const styles = {
  bigContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  container: {
    width: "100%",
    padding: 20
  },
  currencyWrapper: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.teal
  },
  currency: {
    fontSize: fontSize.medium,
    fontWeight: "100",
    color: colors.grey,
    letterSpacing: 4
  },
  heading: {
    fontSize: fontSize.large,
    fontWeight: "200",
    color: colors.white,
    letterSpacing: 6
  }
}

function List({ currency: currentCurrency, onCurrencyChange }) {
  let query = gql`
    query rates($currency: String!) {
      rates(currency: $currency) {
        currency
        rate
      }
    }
  `
  return (
    <Query 
      query={query} 
      variables={{currency: currentCurrency}}>
        {({ loading, error, data }) => {
          if(loading) return <p>Loading...</p>
          if(error) return <p>Something went wrong</p>

          return (
            <div style={styles.container}>
              { data.rates.filter(({currency}) => currency !== currentCurrency && ["USD", "BTC", "LTC", "EUR", "JPY", "ETH"].includes(currency))
                .map(({ currency, rate }, i, rateArr) => (
                  <div style={[styles.currencyWrapper, i === rateArr.length - 1 && { borderBottomWidth:0}]}
                    key={currency}>
                      <p style={styles.currency}>{currency}</p>
                      <p style={styles.currency}>
                        {rate > 1 ? numeral(rate).format("0,0.00") : rate}
                      </p>
                  </div>
                ))
              }
            </div>
          );
        }}
    </Query>
  )
}

export default class ExchangeRate extends React.Component {
  state = {
    currency: "USD"
  };

  onCurrencyChange = currency => this.setState(() => ({ currency }))

  render() {
  const { currency } = this.state;
  
  return (
    <div style={styles.bigContainer}>
      <p style={styles.heading}>{`1 ${this.state.currency}`}</p>
      <List 
        currency={currency} 
        onCurrencyChange={this.onCurrencyChange}
      />
    </div>
  )
}
}