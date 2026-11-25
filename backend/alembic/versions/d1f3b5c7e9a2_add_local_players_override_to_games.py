"""add local_players_override to games

Revision ID: d1f3b5c7e9a2
Revises: 625ae91006c0
Create Date: 2026-10-27 23:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd1f3b5c7e9a2'
down_revision: Union[str, None] = '625ae91006c0'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('games', sa.Column('local_players_override', sa.Integer(), nullable=True))


def downgrade() -> None:
    op.drop_column('games', 'local_players_override')
