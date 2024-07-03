export function extractTaskDetails(message, date) {
  console.log(`parsing message for a task`);
  // Define the regular expression to match the expected format
  const regex = /^new task: task=(.+), reasoning=(.+)$/;
  
  // Test the string against the regex
  const match = message.match(regex);
  
  if (match) {
    // If it matches, extract the task and reasoning
    const task = match[1];
    const reasoning = match[2];
    const newTask = { task, reasoning, date };
    console.log(`found task:`, newTask);
    
    // Return the extracted details
    return newTask;
  } else {
    // If it doesn't match, return null or an appropriate error message
    return null;
  }
}

export function extractGoalDetails(message, date) {
  console.log(`parsing message for a task`);
  // Define the regular expression to match the expected format
  const regex = /^goal is now: Goal\(description='(.+)', completed=(True|False), goal_id='([a-f0-9-]+)'\)$/;
  
  // Test the string against the regex
  const match = message.match(regex);
  
  if (match) {
    // If it matches, extract the details
    const description = match[1];
    const completed = match[2] === 'True';
    const goal_id = match[3];
    const newGoal = { description, completed, goal_id, date };
    console.log(`found goal:`, newGoal);
    
    // Return the extracted details
    return newGoal;
  } else {
    // If it doesn't match, return null or an appropriate error message
    return null;
  }
}

function isConvertibleToNumber(value) {
  const number = Number(value);
  return !isNaN(number);
}

function validateRequest(req) {
  let { offset, limit } = req.query;

  offset = offset || '0';
  limit = limit || '100';
        
  if (!isConvertibleToNumber(offset) || !isConvertibleToNumber(limit)) {
    throw Error("pagination must be numbers");
  }
}

async function getWithPagination(req, collection) {
  let { offset, limit, search } = req.query;
  offset = offset || '0';
  limit = limit || '100';

  const query = {};
  if (search) {
    query.text = { $regex: search, $options: 'i' }; // Case-insensitive search
  }

  try {
    const results = await collection.find(query)
      .sort({ date: -1 }) // Sort by date in descending order
      .skip(parseInt(offset))
      .limit(parseInt(limit))
      .toArray();

    return results;
  } catch (err) {
    console.error('Failed to fetch posts', err);
    throw Error("Cannot fetch")
  }
}

export async function handlMultiGet(req, res, collection, res_key) {
  try {
    validateRequest(req);
  } catch {
    return res.status(400).send({ message: 'invalid request' });
  }

  let data;
  try {
    data = await getWithPagination(req, collection);
  } catch {
    return res.status(500).send({ message: 'Failed to fetch posts' });
  }

  // @ts-ignore
  return res.status(200).send({ [res_key]: data });
}
