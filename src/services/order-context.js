import React from 'react';

export const OrderContext = React.createContext(
                                {
                                    "success": false,
                                    "name": "",
                                    "order": { "number": null }
                                });