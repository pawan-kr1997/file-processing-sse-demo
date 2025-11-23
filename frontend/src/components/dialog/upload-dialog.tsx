import {
  Button,
  CloseButton,
  Dialog,
  HStack,
  Portal,
  Text,
  Box,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { GoPlus } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { BsStars } from "react-icons/bs";

import "./upload-dialog.css";
import Dropzone from "../dropzone/dropzone";
import { useState } from "react";

interface UploadDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setOpenProgress: (open: boolean) => void;
}

const UploadDialog: React.FC<UploadDialogProps> = ({
  open,
  setOpen,
  setOpenProgress,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <Dialog.Root
      lazyMount
      placement={"center"}
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      size={"xl"}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content className="content">
            <Dialog.Header className="header">
              <Dialog.Title>
                <HStack gap={2}>
                  <Box className="icon-border">
                    <Icon size="lg">
                      <GoPlus color="#e07aaf" />
                    </Icon>
                  </Box>
                  <Text fontSize={"18.75px"}>
                    Upload files to create a video
                  </Text>
                </HStack>
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb={0} pt={5} px={8}>
              <HStack justify={"space-between"}>
                <Text fontSize={"15px"} fontWeight={600}>
                  Upload a slide deck, document or image to create a video.
                </Text>
                <Button color={"#da589b"} variant={"plain"} disabled>
                  <IoSettingsOutline /> Script Settings
                </Button>
              </HStack>
              <Dropzone
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
              />
            </Dialog.Body>
            <Dialog.Footer px={8}>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button
                colorPalette="pink"
                disabled={!selectedFile}
                onClick={() => {
                  setOpen(false);
                  setOpenProgress(true);
                }}
              >
                <BsStars />
                Create
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="lg" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default UploadDialog;
