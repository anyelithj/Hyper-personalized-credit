import flax.linen as nn
import jax.numpy as jnp

class Encoder(nn.Module):
    latent_dim: int = 16
    hidden_dims: tuple = (64, 32)
    dropout_rate: float = 0.1

    @nn.compact
    def __call__(self, x: jnp.ndarray, train: bool = True) -> jnp.ndarray:
        h = x
        for dim in self.hidden_dims:
            h = nn.Dense(dim)(h)
            h = nn.LayerNorm()(h)
            h = nn.silu(h)
            if self.dropout_rate > 0.0:
                h = nn.Dropout(rate=self.dropout_rate, deterministic=not train)(h)
        z = nn.Dense(self.latent_dim, name="latent_layer")(h)
        return z

class Decoder(nn.Module):
    out_dim: int = 81
    hidden_dims: tuple = (32, 64)
    dropout_rate: float = 0.1

    @nn.compact
    def __call__(self, z: jnp.ndarray, train: bool = True) -> jnp.ndarray:
        h = z
        for dim in self.hidden_dims:
            h = nn.Dense(dim)(h)
            h = nn.LayerNorm()(h)
            h = nn.silu(h)
            if self.dropout_rate > 0.0:
                h = nn.Dropout(rate=self.dropout_rate, deterministic=not train)(h)
        reconstruction = nn.Dense(self.out_dim)(h)
        # Probabilidades mediante sigmoid para datos binarios One-Hot
        return nn.sigmoid(reconstruction)

class TabularAutoencoder(nn.Module):
    input_dim: int = 81
    latent_dim: int = 16
    hidden_dims: tuple = (64, 32)
    dropout_rate: float = 0.1

    def setup(self):
        self.encoder = Encoder(
            latent_dim=self.latent_dim,
            hidden_dims=self.hidden_dims,
            dropout_rate=self.dropout_rate
        )
        self.decoder = Decoder(
            out_dim=self.input_dim,
            hidden_dims=self.hidden_dims[::-1],
            dropout_rate=self.dropout_rate
        )

    def __call__(self, x: jnp.ndarray, train: bool = True):
        z = self.encoder(x, train=train)
        x_rec = self.decoder(z, train=train)
        return x_rec

    def encode(self, x: jnp.ndarray):
        return self.encoder(x, train=False)

    def decode(self, z: jnp.ndarray):
        return self.decoder(z, train=False)
