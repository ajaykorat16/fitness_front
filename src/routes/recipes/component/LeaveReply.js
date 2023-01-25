import React from "react";
import { Row, Col, Input, Button } from "antd";

const LeaveReply = () => {
  const { TextArea } = Input;

  return (
    <div className="leave-reply-lr">
      <h2 className="recommended-hding-rm">Leave a reply</h2>
      <div className="submit-text-lr">
        <TextArea rows={4} />
        <Button>Submit comment</Button>
      </div>
    </div>
  );
};

export default LeaveReply;
