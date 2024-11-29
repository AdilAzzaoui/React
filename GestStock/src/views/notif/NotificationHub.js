// NotificationComponent.js

import React, { useState, useEffect } from 'react';
import * as signalR from "@microsoft/signalr";

const NotificationHub = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("localhost:7295/notificationHub")
      .build();

    connection.start()
      .then(() => console.log("Connection established."))
      .catch(error => console.error(error));

    connection.on("ReceiveNotification", notification => {
      setNotifications([...notifications, notification]);
    });

    return () => {
      connection.stop();
    };
  }, [notifications]);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationHub;
