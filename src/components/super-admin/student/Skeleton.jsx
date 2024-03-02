import {
  Skeleton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TableCell,
  TableRow,
} from "@mui/material";

const SkeletonBody = ({ number }) => {
  return [...Array(number)].map((_row, index) => (
    <TableRow key={index}>
      <TableCell width={50}>
        <Skeleton variant="rounded" width={20} height={20} />
      </TableCell>
      <TableCell className="customerName">
        <List>
          <ListItem disableGutters>
            <ListItemAvatar>
              <Skeleton variant="circular" width={50} height={50} />
            </ListItemAvatar>
            <ListItemText primary={<Skeleton variant="text" width={100} />} />
          </ListItem>
        </List>
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width={80} />
      </TableCell>
      <TableCell align="left">
        <Skeleton variant="text" width={100} />
      </TableCell>
      <TableCell align="left">
        <Skeleton variant="text" width={80} />
      </TableCell>
      <TableCell align="left">
        <Skeleton variant="text" width={80} />
      </TableCell>
      <TableCell align="left">
        <Skeleton variant="text" width={50} />
      </TableCell>
      <TableCell width={80}>
        <Skeleton variant="text" width={40} height={20} />
      </TableCell>
      <TableCell width={50}>
        <Skeleton variant="text" width={40} height={20} />
      </TableCell>
    </TableRow>
  ));
};

export default SkeletonBody;
