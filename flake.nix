{
  description = "A portfolio flake";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-26.05";
  };

  outputs = {
    self,
    nixpkgs,
  }: let
    system = "x86_64-linux";
    pkgs = import nixpkgs {
      inherit system;
    };
  in {
    devShells.${system}.default = pkgs.mkShell {
      packages = with pkgs; [
        bun
      ];

      shellHook = ''
        echo "Portfolio dev shell"
        echo "Run: bun install"
        echo "Then: bun dev"
      '';
    };
  };
}
