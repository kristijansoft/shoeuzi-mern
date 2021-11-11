const PaymentOption = () => {
  return (
    <form onSubmit={handleSubmit}>
      <Box className="primary-structure--box" sx={{ py: 2 }}>
        <Typography className="font-bold">Payment Options</Typography>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="gender"
            name="payment_methods"
            value={paymentOption}
            onChange={handleChange}
          >
            <FormControlLabel
              value="card"
              control={<Radio color="primary" />}
              label="Credit Card/Debit Card"
              // labelPlacement="start"
            />
            <FormControlLabel
              value="paypal"
              control={<Radio color="primary" />}
              label="Paypal"
              // labelPlacement="start"
            />
          </RadioGroup>
        </FormControl>
        <Box className="form-group m-b-20">
          <label>Card Number*</label>
          <Box className="input-with-icon">
            {/* <TextValidator
                          autoFocus
                          autoComplete="off"
                          variant="outlined"
                          id="card_number"
                          key="card_number"
                          name="card_number"
                          placeholder="xxxx - xxxx - xxxx"
                          value={cardNumber}
                          onChange={(e) => {
                            setCreditCardNumber(e);
                          }}
                          type="text"
                          validators={['required']}
                          errorMessages={['this field is required']}
                        /> */}
            <img src={masterCard} width="20" alt="Card" />
            {/* <img src={visa} width="30" alt="Card" />
                          <img src={paypal} width="15" alt="Card" /> */}
            {cardNumberError && (
              <Typography
                component="p"
                className="custom-error"
                id="card_number-helper-text"
              >
                {cardNumberError}
              </Typography>
            )}
          </Box>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box className="form-group">
              <label>Expiry Date*</label>
              {/* <TextValidator
                            autoComplete="off"
                            variant="outlined"
                            id="expiry_date"
                            key="expiry_date"
                            name="expiry_date"
                            placeholder="01/2020"
                            value={cardDate}
                            onChange={(e) => {
                              setExpiryDate(e);
                            }}
                            type="text"
                            validators={['required']}
                            errorMessages={['this field is required']}
                          /> */}
              {expiryDateError && (
                <Typography
                  component="p"
                  className="custom-error"
                  id="card_number-helper-text"
                >
                  {expiryDateError}
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box className="form-group">
              <label>Security Code*</label>
              {/* <TextValidator
                            autoComplete="off"
                            variant="outlined"
                            id="security_code"
                            key="security_code"
                            name="security_code"
                            placeholder="123"
                            value={cvvCode}
                            onChange={(e) => {
                              setSecurityCode(e);
                            }}
                            type="text"
                            validators={['required']}
                            errorMessages={['this field is required']}
                          /> */}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};
