import {
  Box,
  Button,
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogPositioner,
  HStack,
  Icon,
  Portal,
  Progress,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface ProgressDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ProgressDialog: React.FC<ProgressDialogProps> = ({ open, setOpen }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Uploading the file");

  const isDone = progress >= 100;

  useEffect(() => {
    if (open) {
      const eventSource = new EventSource("http://localhost:8080/");

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(`Upload: ${data.progress}% - ${data.status}`);

        setProgress(data.progress);
        setStatus(data.status);

        if (data.status === "Completed") {
          eventSource.close();
          console.log("Upload complete!");
        }
      };

      return () => eventSource.close();
    }
  }, [open]);

  return (
    <Dialog.Root open={open} placement="center" closeOnEscape={false}>
      <Portal>
        <DialogBackdrop />
        <DialogPositioner>
          <DialogContent p={8} borderRadius="2xl" textAlign="center">
            {!isDone && (
              <DialogBody>
                <VStack gap={4}>
                  <Box w="100%" textAlign="left">
                    <HStack>
                      <Spinner color="white" />
                      <Text
                        fontSize="lg"
                        fontWeight="medium"
                        color="white"
                        transition="all 1s ease-in-out"
                      >
                        {status}
                      </Text>
                    </HStack>
                  </Box>
                  <Progress.Root
                    width="100%"
                    value={progress}
                    variant="outline"
                    colorPalette={"pink"}
                  >
                    <Progress.Track>
                      <Progress.Range />
                    </Progress.Track>
                  </Progress.Root>
                  <Text fontSize="md" color="fg.muted">
                    {progress}% completed
                  </Text>
                </VStack>
              </DialogBody>
            )}

            {isDone && (
              <>
                <DialogBody>
                  <VStack gap={4}>
                    <Icon as={FaCheckCircle} boxSize={10} color="green.400" />
                    <Text fontSize="lg" fontWeight="medium" color="white">
                      File processed successfully
                    </Text>
                  </VStack>
                </DialogBody>

                <DialogFooter>
                  <Button
                    w="full"
                    colorPalette="pink"
                    onClick={() => {
                      setOpen(false);
                      setProgress(0);
                      setStatus("Uploading the file");
                    }}
                  >
                    Go to Home
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </DialogPositioner>
      </Portal>
    </Dialog.Root>
  );
};

export default ProgressDialog;
