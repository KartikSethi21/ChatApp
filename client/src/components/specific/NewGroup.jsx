import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";
import { useInputValidation } from "6pp";
import {
  useAvailableFriendsQuery,
  useNewGroupMutation,
} from "../../redux/api/api";
import { useAsyncMutation, useErrors } from "../../hook/hooks";
import { setIsNewGroup } from "../../redux/reducers/misc";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

function NewGroup() {
  const { isNewGroup } = useSelector((state) => state.misc);
  const groupName = useInputValidation("");

  const dispatch = useDispatch();

  // const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const { isError, isLoading, error, data } = useAvailableFriendsQuery();

  // console.log(data);
  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);

  const errors = [
    {
      isError,
      error,
    },
  ];

  useErrors(errors);

  const selectMemberHandler = (id) => {
    // setMembers((prev)=>
    // prev.map((user)=>
    // user._id===id ?
    //  {...user,isAdded:!user.isAdded}:user));

    setSelectedMembers((prev) =>
      // i is item ==>currentId
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };
  // console.log(selectedMembers);
  const submitHandler = () => {
    if (!groupName.value) return toast.error("Group name is required");

    if (selectedMembers.length < 2)
      return toast.error("Please Select Atleast 3 Members");

    // Create Group
    newGroup("Creating New Group...", {
      name: groupName.value,
      members: selectedMembers,
    });

    closeHandler();
    // console.log(groupName.value, selectedMembers);
  };

  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };
  return (
    <div>
      <Dialog open={isNewGroup} onClose={closeHandler}>
        <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"} spacing={"1rem"}>
          <DialogTitle textAlign={"center"} variant='"h4'>
            New Group
          </DialogTitle>
          <TextField
            label="Group Name"
            value={groupName.value}
            onChange={groupName.changeHandler}
          />
          <Typography variant="body1">Members</Typography>

          <Stack>
            {isLoading ? (
              <Skeleton />
            ) : (
              // members.map
              data?.friends?.map((i) => (
                <UserItem
                  user={i}
                  key={i._id}
                  handler={selectMemberHandler}
                  isAdded={selectedMembers.includes(i._id)}
                />
              ))
            )}
          </Stack>
          <Stack direction={"row"} justifyContent={"space-evenly"}>
            <Button
              variant="outlined"
              color="error"
              size="large"
              onClick={closeHandler}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={submitHandler}
              disabled={isLoadingNewGroup}
            >
              Create
            </Button>
          </Stack>
        </Stack>
      </Dialog>
    </div>
  );
}

export default NewGroup;
