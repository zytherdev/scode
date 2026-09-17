# @zyther/scode-cli

Command-line interface for encoding and decoding messages with classic ciphers.

```bash
npm install -g @zyther/scode-cli
```

## Usage

```bash
scd encode "hello world" --pattern "¬"
# → -.-. .... . .-.. .-.. ---

scd decode "-.-. .... . .-.. .-.. ---" --pattern "¬"
# → HELLOWORLD

scd ciphers          # list every cipher
scd patterns         # show composition examples
scd                  # interactive mode
```

## Pipes and files

```bash
# From a file
scd encode --file message.txt --pattern "?" --out encrypted.txt
scd encode --file message.txt --pattern "?" --config-out config.txt

# Decode with config
scd decode --file encrypted.txt --pattern "?" --config-file config.txt

# Unix pipes
echo "hello" | scd encode --pattern "¬" | scd decode --pattern "¬"
```

## Chained patterns

```bash
scd encode "meet me at dawn" --pattern "?|"
```

## JSON output

For scripts and CI:

```bash
scd encode "hello" --pattern "¬" --json
scd ciphers --json
```

## License

MIT © [Zyther Dev](https://zyther.dev)