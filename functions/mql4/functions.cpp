// Loop through all the closed orders
for(int i = 0; i < OrdersHistoryTotal(); i++)
{
    // Select the order from the history
    if(OrderSelect(i, SELECT_BY_POS, MODE_HISTORY))
    {
        // Check if the order belongs to the current user
        if(OrderMagicNumber() == MagicNumber) // MagicNumber should be your unique identifier
        {
            // Now you can access all the details of the order
            Print("Order Ticket: ", OrderTicket());
            Print("Order Type: ", OrderType());
            Print("Order Lots: ", OrderLots());
            Print("Order Open Price: ", OrderOpenPrice());
            Print("Order Close Price: ", OrderClosePrice());
            Print("Order Profit: ", OrderProfit());
            // ... and any other details you need
        }
    }
}

struct TradeData {
    int userAccount;
    double openPrice;
    double closePrice;
    double lots;
    // Add other trade-related data as needed
};


TradeData[] tradeDataArray;


void HandleTradesForUser(int userAccount, double openPrice, double closePrice, double lots) {
    TradeData newTrade;
    newTrade.userAccount = userAccount;
    newTrade.openPrice = openPrice;
    newTrade.closePrice = closePrice;
    newTrade.lots = lots;
    // Add other trade-related data to the struct as needed
    
    // Store the trade data in the array
    ArrayResize(tradeDataArray, ArraySize(tradeDataArray) + 1);
    tradeDataArray[ArraySize(tradeDataArray) - 1] = newTrade;
}


// Example usage of the function
void OnTrade() {
    // Get user-specific trade data from MT4 trade functions
    int userAccount = AccountNumber();
    double openPrice = OrderOpenPrice();
    double closePrice = OrderClosePrice();
    double lots = OrderLots();
    
    // Call the function to handle trades for the specific user
    HandleTradesForUser(userAccount, openPrice, closePrice, lots);
}