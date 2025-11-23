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
  const URL = import.meta.env.VITE_URL;
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Uploading the file");

  const isDone = progress >= 100;

  // Create an AbortController
  const abortController = new AbortController();

  const fetchSSE = async () => {
    try {
      const response = await fetch(`${URL}/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "text/event-stream",
        },
        body: JSON.stringify({}),
        signal: abortController.signal,
      });

      if (!response.body) {
        throw new Error("No data found");
      }

      const reader = response.body
        .pipeThrough(new TextDecoderStream())
        .getReader();

      while (true) {
        const { value, done } = await reader.read();

        if (done) break;

        const lines = value.split("\n").filter((line) => line.trim() !== "");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const jsonString = line.replace("data: ", "");

            const parsed = JSON.parse(jsonString);
            setProgress(parsed.progress);
            setStatus(parsed.status);
          }
        }
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        console.log("Connection closed on unmount");
      } else if (error instanceof Error) {
        console.error("Error:", error.message);
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (open) {
      fetchSSE();
    }

    return () => {
      abortController.abort();
    };
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
