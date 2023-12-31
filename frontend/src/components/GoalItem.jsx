import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteGoal, updateGoal } from '../features/goals/goalSlice';

function GoalItem({ goal }) {
  const dispatch = useDispatch();
  const [updating, setUpdating] = useState(false);
  const [text, setText] = useState(goal.text);

  // To ensure the local state (text) stays in sync with the prop (goal.text)
  useEffect(() => {
    setText(goal.text);
  }, [goal.text]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateGoal({ ...goal, text: text }));
    setUpdating(false);
    setText('');
  };

  return (
    <div className='goal'>
      <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>

      {updating ? (
        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="text"
                id="text"
                value={text}
                placeholder="Update goal"
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-block">Update Goal</button>
            </div>
          </form>
        </section>
      ) : (
        <span onClick={() => setUpdating(!updating)}>
          <h2>{goal.text}</h2>
        </span>
      )}

      <button onClick={() => dispatch(deleteGoal(goal._id))} className='close'>
        X
      </button>
    </div>
  );
}

export default GoalItem;
