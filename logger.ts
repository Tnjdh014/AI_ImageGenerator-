import fs from 'fs';

interface UserLogEntry {
  timestamp: string;
  action: string;
  details: any;
}

interface UserData {
  username: string;
  logs: UserLogEntry[];
  imagesGenerated: string[];
  comments: string[];
  likes: string[];
}

const usersData: Record<string, UserData> = {};

const logAction = (username: string, action: string, details: any = null) => {
  const timestamp = new Date().toISOString();

  if (!usersData[username]) {
    usersData[username] = {
      username,
      logs: [],
      imagesGenerated: [],
      comments: [],
      likes: [],
    };
  }

  // Log the action
  const logEntry: UserLogEntry = { timestamp, action, details };
  usersData[username].logs.push(logEntry);

  // For specific actions, store the relevant data
  if (action === 'generated_image') {
    usersData[username].imagesGenerated.push(details);
  } else if (action === 'commented') {
    usersData[username].comments.push(details);
  } else if (action === 'liked') {
    usersData[username].likes.push(details);
  }

  // Optionally save data to a file
  saveLogsToFile();
};

const getUserData = (username: string): UserData | null => {
  return usersData[username] || null;
};

const saveLogsToFile = () => {
  const data = JSON.stringify(usersData, null, 2);
  fs.writeFileSync('logs.json', data);
};

// Example of clearing all logs (can be used if needed)
const clearAllLogs = () => {
  fs.unlinkSync('logs.json');
  Object.keys(usersData).forEach((username) => {
    usersData[username] = {
      username,
      logs: [],
      imagesGenerated: [],
      comments: [],
      likes: [],
    };
  });
};

export { logAction, getUserData, saveLogsToFile, clearAllLogs };
